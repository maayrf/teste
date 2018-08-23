/**
 *
 * EggDetail
 *
 */

import React, { Component } from 'react';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import { Row, Tabs } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import './style.less';
import EggDetailWorkingHours from './components/EggDetailOperatingHours';
import MeterGeneralInfoTab from '../../containers/MeterGeneralInfoTab';
const { TabPane } = Tabs;

const GENERAL_INFORMATION_URL_PARAM = 'informacoes-gerais';
const WORKING_HOURS_URL_PARAM = 'quadros-de-horarios-de-funcionamento';

class EggDetail extends Component {
  componentDidUpdate() {
    const { match, history } = this.props;
    if (match.url === history.location.pathname) {
      this.props.history.push(`${match.url}/${GENERAL_INFORMATION_URL_PARAM}`);
    }
  }

  onChange = (key) => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/${key}`);
  };

  getActiveKey = () => {
    const { match, history } = this.props;
    return history.location.pathname.replace(`${match.url}/`, '');
  };

  renderTabPanes = () => {
    const { match } = this.props;
    const tabPanes = [
      {
        title: (
          <Link to={GENERAL_INFORMATION_URL_PARAM}>Informações Gerais</Link>
        ),
        key: GENERAL_INFORMATION_URL_PARAM,
        component: (
          <Route
            path={`${match.url}/${GENERAL_INFORMATION_URL_PARAM}`}
            render={() => <MeterGeneralInfoTab egg={this.props.egg} />}
          />
        ),
      },
      {
        title: (
          <Link to={WORKING_HOURS_URL_PARAM}>
            {' '}
            Quadros de Horários de Funcionamento
          </Link>
        ),
        key: WORKING_HOURS_URL_PARAM,
        component: (
          <Route
            path={`${match.url}/${WORKING_HOURS_URL_PARAM}`}
            render={() => <EggDetailWorkingHours egg={this.props.egg} />}
          />
        ),
      },
    ];
    return tabPanes.map((tabPane) => (
      <TabPane tab={tabPane.title} key={tabPane.key}>
        <Switch>{tabPane.component}</Switch>
      </TabPane>
    ));
  };

  render() {
    const {
      egg: { id, hardwareVersion, installationDate },
    } = this.props;
    const installationDateFormatted = moment(installationDate).format('DD/MM/YYYY HH:mm');
    const activeKey = this.getActiveKey();
    return (
      <div className="egg-detail">
        <h3>ID #{id}</h3>
        <Row type="flex" gutter={10}>
          <span>
            VERSÃO DO HARDWARE <strong>{hardwareVersion}</strong>
          </span>
          <span>
            DATA DE INSTALAÇÃO: <strong>{installationDateFormatted}</strong>
          </span>
        </Row>
        <div style={{ height: 800 }}>
          <Tabs activeKey={activeKey} onChange={this.onChange}>
            {this.renderTabPanes()}
          </Tabs>
        </div>
      </div>
    );
  }
}

EggDetail.propTypes = {
  egg: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      tab: PropTypes.string,
    }),
  }),
};

export default withRouter(EggDetail);
