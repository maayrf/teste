/**
 *
 * ConsumptionTable
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { convertDataSource } from './formatConsumptionsDataToTable';
import './style.less';
import LegendColorBoxByMeter from '../../../../components/LegendColorBoxByMeter/index';

class ConsumptionTable extends Component {
  getColumns = (actionColumns) => {
    const columns = [
      {
        title: '',
        dataIndex: 'color',
        key: 'color',
        render: (value, info, index) =>
          info.name !== 'Total' ? (
            <LegendColorBoxByMeter index={index} typeMeter={info.className} />
          ) : null,
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Consumo de ponta',
        dataIndex: 'rush',
        key: 'rush',
        render: (rush) => this.renderConsumption(rush),
      },
      {
        title: 'Consumo fora de ponta',
        dataIndex: 'outrush',
        key: 'outrush',
        render: (outrush) => this.renderConsumption(outrush),
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (total) => this.renderConsumption(total),
      },
    ];
    if (actionColumns) {
      columns.push({
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: actionColumns,
      });
    }
    return columns;
  };

  // TODO : Crash on prod
  renderConsumption = (val) => {
    const consumption = `${val.consumption} ${val.consumptionUnit}`;
    const cost = `${val.costUnit} ${val.cost.toFixed(2)}`;
    return (
      <div>
        <span className="ant-col-12">{consumption}</span>
        <span className="ant-col-12">{cost}</span>
      </div>
    );
  };

  render() {
    const { actionColumns, consumptions } = this.props;
    const columns = this.getColumns(actionColumns);
    const dataSource = convertDataSource(consumptions);
    return (
      <div className="consumption-table">
        <Table
          className="ant-table-footer-bold"
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </div>
    );
  }
}

ConsumptionTable.propTypes = {
  consumptions: PropTypes.object.isRequired,
  actionColumns: PropTypes.func,
};

export default ConsumptionTable;
