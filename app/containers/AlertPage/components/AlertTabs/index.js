/**
 *
 * AlertTabs
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import './style.less';
import AlertsEmittedTab from '../../../AlertsEmittedTab';
import AlertsConfigurationTab from '../../../AlertsConfigurationTab';
const { TabPane } = Tabs;

const ALERTS_EMITTED_TAB_URL = 'alertas-emitidos';
const ALERTS_CONFIGURATIONS_TAB_URL = 'configuracoes-de-alertas';

class AlertTabs extends Component {
  componentWillMount() {
    const { match, history } = this.props;

    if (this.isRootPath()) {
      this.sendToTheMainTab();
    }
  }
  componentDidUpdate() {
    if (this.isRootPath()) {
      this.sendToTheMainTab();
    }
  }
  isRootPath = () => {
    const { match, history } = this.props;
    return match.path === history.location.pathname;
  };
  sendToTheMainTab = () => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/${ALERTS_EMITTED_TAB_URL}`);
  };
  onChange = (activeKey) => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/${activeKey}`);
  };
  getActiveKey = () => {
    const { history, match } = this.props;
    return history.location.pathname
      .replace(`${match.path}/`, '')
      .split('/')[0];
  };
  renderTabPanes() {
    const { match } = this.props;
    const tabPanes = [
      {
        url: ALERTS_EMITTED_TAB_URL,
        component: AlertsEmittedTab,
        title: 'Alertas Emitidos',
      },
      {
        url: ALERTS_CONFIGURATIONS_TAB_URL,
        component: AlertsConfigurationTab,
        title: 'Configurações de Alertas',
      },
    ];
    return tabPanes.map((tabPane) => (
      <TabPane
        tab={tabPane.title}
        key={tabPane.url}
        style={{ padding: '0px 10px' }}
      >
        <Route
          path={`${match.url}/${tabPane.url}`}
          component={tabPane.component}
        />
      </TabPane>
    ));
  }
  render() {
    const activeKey = this.getActiveKey();
    return (
      <Tabs onChange={this.onChange} activeKey={activeKey}>
        {this.renderTabPanes()}
      </Tabs>
    );
  }
}

AlertTabs.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(AlertTabs);
