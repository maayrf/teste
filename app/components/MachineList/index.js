/**
 *
 * MachineList
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Table } from 'antd';

class MachineList extends Component {
  render() {
    const { actionColumn } = this.props;
    const dataSource = this.props.machines;
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Modelo',
        dataIndex: 'model',
        key: 'model',
      },
      {
        title: 'Fabricante',
        dataIndex: 'maker',
        key: 'maker',
      },
      {
        title: 'Corrente Nominal',
        dataIndex: 'nominalVoltage',
        key: 'nominalVoltage',
      },
      {
        title: 'Tensão Nominal',
        dataIndex: 'ratedCurrent',
        key: 'ratedCurrent',
      },
      {
        title: 'Observações',
        dataIndex: 'comments',
        key: 'comments',
      },
    ];
    if (actionColumn) {
      columns.push({
        title: '',
        key: 'actions',
        render: actionColumn,
      });
    }
    return (
      <div className="machine-list">
        <Table
          pagination={false}
          size="small"
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

MachineList.propTypes = {
  machines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    model: PropTypes.string,
    maker: PropTypes.string,
    nominalVoltage: PropTypes.number,
    ratedCurrent: PropTypes.number,
    comments: PropTypes.string,
  })),
  actionColumn: PropTypes.func,
};

export default MachineList;
