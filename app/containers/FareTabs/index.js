/**
 *
 * FareTabs
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import './style.less';
import ConsumptionFareTab from '../../components/ConsumptionFareTab/index';
import DemandExceedFareTab from '../../components/DemandExceedFareTab/index';
import DemandFareTab from '../../components/DemandFareTab/index';
const CONSUMPTION_FARE_URL_PARAM = 'tarifas-de-consumo';
const DEMAND_EXCEED_FARE_URL_PARAM = 'tarifas-de-ultrapassagem';
const DEMAND_URL_PARAM = 'tarifas-de-demanda';
const { TabPane } = Tabs;

class FareTabsByBranch extends Component {
  state = {
    defaultActiveKey: CONSUMPTION_FARE_URL_PARAM,
  };
  renderTabPanes = () => {
    const { branchId } = this.props;
    const tabPanes = [
      {
        title: 'Tarifas de Consumo',
        key: CONSUMPTION_FARE_URL_PARAM,
        component: <ConsumptionFareTab branchId={branchId} />,
      },
      {
        title: 'Tarifas de Ultrapassagem de Demanda',
        key: DEMAND_EXCEED_FARE_URL_PARAM,
        component: <DemandExceedFareTab branchId={branchId} />,
      },
      {
        title: 'Tarifas de Demanda Contratada',
        key: DEMAND_URL_PARAM,
        component: <DemandFareTab branchId={branchId} />,
      },
    ];
    return tabPanes.map((tabPane) => (
      <TabPane tab={tabPane.title} key={tabPane.key}>
        {tabPane.component}
      </TabPane>
    ));
  };
  render() {
    const { defaultActiveKey } = this.state;
    return (
      <Tabs
        tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
        onChange={this.onChange}
        defaultActiveKey={defaultActiveKey}
      >
        {this.renderTabPanes()}
      </Tabs>
    );
  }
}

FareTabsByBranch.propTypes = {
  branchId: PropTypes.number.isRequired,
};

export default FareTabsByBranch;
