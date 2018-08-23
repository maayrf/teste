/**
 *
 * MeterList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';
import './style.less';

const getColumns = (actionColumn, branch) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unidade',
      dataIndex: 'branch.tradename',
      key: 'branch',
    },
    {
      title: 'Versão do hardware',
      dataIndex: 'hardwareVersion',
      key: 'hardwareVersion',
    },
    {
      title: 'Última comunicação',
      dataIndex: 'lastCommunication',
      key: 'lastCommunication',
      render: (value) => moment(value).fromNow(),
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

const isNotRespondingAddBackgroundRed = (data) => {
  const lastCommunication = moment().diff(
    moment(data.lastCommunication),
    'hours'
  );
  if (lastCommunication >= 12) {
    return 'background-danger';
  }
  return '';
};

const MeterList = ({ meters, actionColumn }) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="meter-list">
      <Table
        size="middle"
        dataSource={meters}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
        rowClassName={isNotRespondingAddBackgroundRed}
      />
    </div>
  );
};

MeterList.propTypes = {
  meters: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default MeterList;
