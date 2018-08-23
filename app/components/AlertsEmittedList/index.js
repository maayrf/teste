/**
 *
 * AlertsEmittedList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.less';
import { DATE_FORMAT_PTBR_WITH_TIME } from '../DateRangePicker/constants';

const getColumns = () => {
  const columns = [
    {
      title: 'Nome',
      name: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Medidor/Área',
      name: 'meter',
      dataIndex: 'meter.name',
    },
    {
      title: 'Unidade',
      name: 'branch',
      dataIndex: 'branch.name',
    },
    {
      title: 'Hora do Alerta',
      name: 'alertTime',
      dataIndex: 'alertTime',
      render: (value) => value.format(DATE_FORMAT_PTBR_WITH_TIME),
    },
  ];
  return columns;
};

class AlertsEmittedList extends React.Component {
  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.handleSelectedRows(selectedRows);
  };

  getRowSelection = () => {
    const { selectedRows } = this.props;
    return {
      selectedRows,
      onChange: this.onSelectChange,
    };
  };

  isUnsolved = (data) => {
    const isAlertUnsolved = !!data.resolved;
    if (!isAlertUnsolved) {
      return 'background-danger';
    }
    return '';
  };

  renderTable = () => {
    const { alertsEmitted } = this.props;
    if (alertsEmitted.length > 0) {
      return (
        <Table
          rowClassName={this.isUnsolved}
          rowSelection={this.getRowSelection()}
          dataSource={alertsEmitted}
          columns={getColumns()}
          pagination={false}
          rowKey={(dataSource) => dataSource.id}
        />
      );
    }
    return (
      <Table
        rowClassName={this.isUnsolved}
        rowSelection={this.getRowSelection()}
        dataSource={[]}
        columns={getColumns()}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    );
  };

  render() {
    return <div className="alerts-emitted-list">{this.renderTable()}</div>;
  }
}

AlertsEmittedList.propTypes = {
  alertsEmitted: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    meter: PropTypes.object,
    branch: PropTypes.object,
    alertDate: PropTypes.object,
    resolved: PropTypes.number.isRequired,
  })).isRequired,
};

export default AlertsEmittedList;
