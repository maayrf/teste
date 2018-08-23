/**
 *
 * UserList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Table } from 'antd';
import BranchTags from '../BranchTags';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Nome',
      key: 'name',
      render: (value, infoUser) => (
        <span>
          <Avatar style={{ marginRight: '10px' }}>
            {infoUser.name.substr(0, 1)}
          </Avatar>
          {infoUser.name}
        </span>
      ),
    },
    {
      title: 'Unidades associadas',
      dataIndex: 'branches',
      key: 'branches',
      render: (branches) => <BranchTags branches={branches} />,
    },
  ];
  if (actionColumn) {
    columns.push({
      key: 'actions',
      render: actionColumn,
    });
  }
  return columns;
};

const UserList = ({ users, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="user-list">
      <Table
        size="middle"
        dataSource={users}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default UserList;
