/**
 *
 * PowerDemandTable
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { convertDataToPowerDemandTable } from './convertDataToPowerDemandTable';
import LegendColorBoxByMeter from '../../../../components/LegendColorBoxByMeter/index';

class PowerDemandTable extends Component {
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
        render: (val, info) => this.ifTotalAddClassBold(val, info),
      },
      {
        title: 'Valor Máximo',
        dataIndex: 'max',
        key: 'max',
        render: (max, info) => this.renderPower('max', info),
      },
      {
        title: 'Valor Minimo',
        dataIndex: 'min',
        key: 'min',
        render: (min, info) => this.renderPower('min', info),
      },
      {
        title: 'Média',
        dataIndex: 'mean',
        key: 'mean',
        render: (mean, info) => this.renderPower('mean', info),
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

  ifTotalAddClassBold = (val, info) => {
    if (info.name === 'Total') {
      return <span className="_bold">{val}</span>;
    }
    return val;
  };

  renderPower = (val, info) => {
    const powerUnit = `${val}Unit`;
    const power = `${info[val]} ${info[powerUnit]}`;
    return (
      <div>
        <span>{this.ifTotalAddClassBold(power, info)}</span>
      </div>
    );
  };

  render() {
    const { actionColumns, powerDemands } = this.props;
    const columns = this.getColumns(actionColumns);
    const dataSource = convertDataToPowerDemandTable(powerDemands);

    return (
      <div>
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

PowerDemandTable.propTypes = {
  powerDemands: PropTypes.object,
  actionColumns: PropTypes.func,
};

export default PowerDemandTable;
