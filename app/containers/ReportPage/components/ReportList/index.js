/**
 *
 * ReportList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Data de Criação',
      dataIndex: 'dateCreation',
      key: 'dateCreation',
      render: (value) => moment(value).format('DD/MM/YYYY HH:MM'),
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

const ReportList = ({ reports, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="report-list">
      <Table
        size="middle"
        dataSource={reports.map((report) => ({
          ...report,
          key: report.id,
          rowKey: report.id,
        }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

ReportList.propTypes = {
  reports: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default ReportList;
