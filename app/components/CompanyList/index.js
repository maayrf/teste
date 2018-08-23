/**
 *
 * CompanyList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import './style.less';
import BranchTags from '../BranchTags';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'tradename',
      key: 'tradename',
    },
    {
      title: 'Unidades',
      dataIndex: 'branches',
      key: 'branches',
      render: (branches) => (
        <BranchTags branches={branches} maxDisplayTags={2} />
      ),
    },
    {
      title: 'Número de medidores',
      dataIndex: 'meters',
      key: 'meters',
      render: (meters) => <span>{`${meters.active}/${meters.total}`}</span>,
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

const CompanyList = ({ companies, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="company-list">
      <Table
        size="middle"
        dataSource={companies}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

CompanyList.propTypes = {
  companies: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default CompanyList;
