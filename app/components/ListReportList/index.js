/**
 *
 * ListReportList
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
      title: 'Date Creation',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
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

const ListReportList = ({ listReports, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="listReport-list">
      <Table
        size="middle"
        dataSource={listReports}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

ListReportList.propTypes = {
  listReports: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default ListReportList;
