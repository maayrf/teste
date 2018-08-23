/**
 *
 * BranchTabs
 *
 */

import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import BranchGeneralInformationFormContainer from '../../../BranchGeneralInformationFormContainer';
import BranchDistributorContainer from '../../../BranchDistributorContainer';
import BranchFaresContainer from '../../../../containers/BranchFaresContainer';
import BranchWorkingHoursContainer from '../../../WorkingHours/BranchWorkingHoursContainer';
import './style.less';
import BranchMetersContainer from '../../../BranchMetersContainer/index';
import BranchUsersTab from '../../../BranchUsersTab/index';

const { TabPane } = Tabs;

const GENERAL_INFORMATION_URL_PARAM = 'informacoes-gerais';
const DISTRIBUTOR_URL_PARAM = 'configuracoes-da-distribuidora';
const FARE_REGISTER_URL_PARAM = 'cadastro-de-tarifas';
const METERS_URL_PARAM = 'medidores';
const RESPONSIBLE_USERS_URL_PARAM = 'usuarios-responsaveis';
const WORKING_HOURS_URL_PARAM = 'quadros-de-horarios-de-funcionamento';

const BRANCH_TABS = [
  GENERAL_INFORMATION_URL_PARAM,
  DISTRIBUTOR_URL_PARAM,
  FARE_REGISTER_URL_PARAM,
  METERS_URL_PARAM,
  RESPONSIBLE_USERS_URL_PARAM,
  WORKING_HOURS_URL_PARAM,
];

class BranchTabs extends Component {
  constructor(props) {
    super(props);
    if (this.isRootURL() || !this.isValidURL()) {
      this.redirectToInitialPage();
    }
  }
  componentDidUpdate() {
    if (this.isRootURL() || !this.isValidURL()) {
      this.redirectToInitialPage();
    }
  }
  onChange = (activeKey) => {
    const { match } = this.props;
    this.props.history.push(`${match.url}/${activeKey}`);
  };
  getActiveKey = () => {
    const { history, match } = this.props;
    return history.location.pathname.replace(`${match.url}/`, '').split('/')[0];
  };
  isValidURL = () => BRANCH_TABS.includes(this.getActiveKey());
  isRootURL = () =>
    this.props.match.url === this.props.history.location.pathname;
  redirectToInitialPage = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/${GENERAL_INFORMATION_URL_PARAM}`);
  };
  renderTabPanes = () => {
    const { match } = this.props;
    const tabPanes = [
      {
        title: 'Informações Gerais',
        key: GENERAL_INFORMATION_URL_PARAM,
        render: () => (
          <BranchGeneralInformationFormContainer
            branch={this.props.branchDetails}
          />
        ),
      },
      {
        title: 'Configuração da Distribuidora',
        key: DISTRIBUTOR_URL_PARAM,
        render: () => (
          <BranchDistributorContainer branchId={this.props.branchDetails.id} />
        ),
      },
      {
        title: 'Cadastro de Tarifas',
        key: FARE_REGISTER_URL_PARAM,
        render: () => (
          <BranchFaresContainer branchId={this.props.branchDetails.id} />
        ),
      },
      {
        title: 'Medidores',
        key: METERS_URL_PARAM,
        render: () => (
          <BranchMetersContainer branch={this.props.branchDetails} />
        ),
      },
      {
        title: 'Usuários Responsáveis',
        key: RESPONSIBLE_USERS_URL_PARAM,
        render: () => <BranchUsersTab branch={this.props.branchDetails} />,
      },
      {
        title: 'Quadros de Horário de Funcionamento',
        key: WORKING_HOURS_URL_PARAM,
        render: () => (
          <BranchWorkingHoursContainer branchId={this.props.branchDetails.id} />
        ),
      },
    ];
    return tabPanes.map(({ title, key, ...restProps }) => (
      <TabPane tab={title} key={key}>
        <Route path={`${match.url}/${key}`} {...restProps} />
      </TabPane>
    ));
  };
  render() {
    const activeKey = this.getActiveKey();
    return (
      <Tabs onChange={this.onChange} activeKey={activeKey}>
        {this.renderTabPanes()}
      </Tabs>
    );
  }
}

BranchTabs.propTypes = {
  match: PropTypes.object.isRequired,
  branchDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
};
export default withRouter(BranchTabs);
