/**
 *
 * CompanyList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'antd';
import './style.less';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'tradename',
      key: 'tradename',
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <span>
          <Icon type="environment" />{' '}
          {`${address.streetName}, ${address.streetNumber} - ${address.state}`}
        </span>
      ),
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

const BranchList = ({ branches, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="company-list">
      <Table
        size="middle"
        dataSource={branches}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

BranchList.propTypes = {
  branches: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default BranchList;
