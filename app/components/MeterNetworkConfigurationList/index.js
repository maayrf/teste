/**
 *
 * MeterNetworkConfigurationList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Protocolo de Segurança',
      dataIndex: 'securityProtocol',
      key: 'securityProtocol',
    },
    {
      title: 'Nome da Rede',
      dataIndex: 'nameNetwork',
      key: 'nameNetwork',
    },
  ];
  if (actionColumn) {
    columns.push({
      title: '',
      key: 'actions',
      render: actionColumn,
    });
  }
  return columns;
};

const MeterNetworkConfigurationList = ({
  meterNetworkConfigurations,
  actionColumn,
}) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="meterNetworkConfiguration-list">
      <Table
        size="middle"
        dataSource={meterNetworkConfigurations}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

MeterNetworkConfigurationList.propTypes = {
  meterNetworkConfigurations: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default MeterNetworkConfigurationList;
