/**
 *
 * MyPerformanceIndexList
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
      title: 'Reference Param',
      dataIndex: 'referenceParam',
      key: 'referenceParam',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Report Interval',
      dataIndex: 'reportInterval',
      key: 'reportInterval',
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

const MyPerformanceIndexList = ({ myPerformanceIndexs, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="myPerformanceIndex-list">
      <Table
        size="middle"
        dataSource={myPerformanceIndexs.map((myPerformanceIndex) => ({
          ...myPerformanceIndex,
          key: myPerformanceIndex.id,
          rowKey: myPerformanceIndex.id,
        }))}
        columns={columns}
      />
    </div>
  );
};

MyPerformanceIndexList.propTypes = {
  myPerformanceIndexs: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default MyPerformanceIndexList;
