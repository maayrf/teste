/**
 *
 * TestingList
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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

const TestingList = ({ testings, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="testing-list">
      <Table
        size="middle"
        dataSource={testings}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

TestingList.propTypes = {
  testings: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default TestingList;
