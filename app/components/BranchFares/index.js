/**
 *
 * BranchFares
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Row, Table } from 'antd';
import './style.less';
import AddConsumptionFareButton from '../../containers/AddConsumptionFareButton/index';
import IconConsumption from '../Icons/IconConsumption';
import IconDemandExceed from '../Icons/IconDemandExceed';
import ConsumptionOutRushFareDetail from '../ConsumptionOutRushFareDetail/';
import ConsumptionRushFareDetail from '../ConsumptionRushFareDetail/';
import DemandExceedOutRushFareDetail from '../DemandExceedOutRushFareDetail/index';
import DemandExceedRushFareDetail from '../DemandExceedRushFareDetail/index';
import DemandOutRushFareDetail from '../DemandOutRushFareDetail/index';
import DemandRushFareDetail from '../DemandRushFareDetail';
import AddDemandExceedFareButton from '../../containers/AddDemandExceedFareButton/index';
import AddDemandFareButton from '../../containers/AddDemandFareButton/index';
import DisableDemandExceedFareFormContainer from '../../containers/DisableDemandExceedFareFormContainer';
import DisableDemandFareFormContainer from '../../containers/DisableDemandFareFormContainer';

class BranchFares extends Component {
  render() {
    const {
      consumptionFare,
      demandFare,
      demandExceedFare,
      branchId,
    } = this.props;
    const columns = [
      {
        title: '',
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: (
          <Row align="middle" type="flex" gutter={5}>
            <IconConsumption />
            <span>Tarifa de Consumo</span>
          </Row>
        ),
        dataIndex: 'consumptionFare',
        key: 'consumptionFare',
      },
      {
        title: (
          <Row align="middle" type="flex" gutter={5}>
            <IconDemandExceed />
            <span>Tarifa de Ultrapassagem de Demanda</span>
          </Row>
        ),
        dataIndex: 'demandExceedFare',
        key: 'demandExceedFare',
      },
      {
        title: (
          <Row align="middle" type="flex" gutter={5}>
            <Icon type="line-chart" />
            <span>Tarifa de Demanda Contratada</span>
          </Row>
        ),
        dataIndex: 'demandFare',
        key: 'demandFare',
      },
    ];

    const dataSource = [
      {
        key: '1',
        label: 'Horário Comum',
        consumptionFare: (
          <ConsumptionOutRushFareDetail consumptionFare={consumptionFare} />
        ),
        demandExceedFare: (
          <DemandExceedOutRushFareDetail demandExceedFare={demandExceedFare} />
        ),
        demandFare: <DemandOutRushFareDetail demandFare={demandFare} />,
      },
      {
        key: '2',
        label: 'Horário de Ponta',
        consumptionFare: (
          <ConsumptionRushFareDetail consumptionFare={consumptionFare} />
        ),
        demandExceedFare: (
          <DemandExceedRushFareDetail demandExceedFare={demandExceedFare} />
        ),
        demandFare: <DemandRushFareDetail demandFare={demandFare} />,
      },
      {
        key: '3',
        label: '',
        consumptionFare: (
          <AddConsumptionFareButton
            consumptionFare={{ branch: { id: branchId } }}
          />
        ),
        demandExceedFare: (
          <div>
            <AddDemandExceedFareButton
              demandExceedFare={{ branch: { id: branchId } }}
            />
            <div className="_margin-top">
              <DisableDemandExceedFareFormContainer
                demandExceedFare={demandExceedFare}
              />
            </div>
          </div>
        ),
        demandFare: (
          <div>
            <AddDemandFareButton demandFare={{ branch: { id: branchId } }} />
            <div className="_margin-top">
              <DisableDemandFareFormContainer demandFare={demandFare} />
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="branch-fares-container">
        <h3>Tarifas Atuais</h3>
        <div className="branch-fares">
          <Table
            className="ant-table-no-head-background table-fares"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            rowClassName="row-align-top"
            bordered
          />
        </div>
      </div>
    );
  }
}

BranchFares.propTypes = {
  branchId: PropTypes.number.isRequired,
  consumptionFare: PropTypes.object,
  demandFare: PropTypes.object,
  demandExceedFare: PropTypes.object,
};

export default BranchFares;
