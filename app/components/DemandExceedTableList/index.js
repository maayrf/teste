/**
 *
 * DemandExceedTableList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';
import { formatToDecimal } from '../../utils/formatNumber';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'Medidor',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Valor atingido',
      dataIndex: 'valueReached',
      key: 'valueReached',
      render: (valueReached) =>
        `${formatToDecimal(valueReached.value)} ${valueReached.unit}`,
    },
    {
      title: 'Data/hora do evento',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
    },
  ];
  if (actionColumn) {
    columns.push({
      title: 'Actions',
      key: 'actions',
      render: actionColumn,
    });
  }
  return columns;
};

const DemandExceedTableList = ({ demandExceedTables, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="demandExceedTable-list _margin-top">
      <Table
        size="middle"
        dataSource={demandExceedTables}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

DemandExceedTableList.propTypes = {
  demandExceedTables: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default DemandExceedTableList;
