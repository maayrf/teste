/**
 *
 * AlertConfigurationList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag, Row, Col, List } from 'antd';
import { DATE_FORMAT_PTBR_WITH_TIME } from '../DateRangePicker/constants';
import moment from 'moment';
import { Link } from 'react-router-dom';

const REFERENCE_PARAMETER_MESSAGES = {
  CONSUMPTION: 'Consumo',
};

const getColumns = (actionColumn) => {
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
      title: 'Parâmetro de Referência',
      dataIndex: 'referenceParam',
      key: 'referenceParam',
      render: (value) => REFERENCE_PARAMETER_MESSAGES[value],
    },
    {
      title: 'Data de Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => moment(value).format(DATE_FORMAT_PTBR_WITH_TIME),
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
// TODO: Did it because apiary wasnt working
const data = {
  success: true,
  error: '',
  data: {
    filtered: '',
    offset: 0,
    limit: 15,
    total: 89,
    items: [
      {
        id: 1,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 123,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback Paulista',
            },
          },
          {
            id: 1333,
            className: 'Egg',
            name: 'EGG Fera',
            branch: {
              id: 11,
              name: 'Outback Paulista',
            },
          },
          {
            id: 123654,
            className: 'Grouping',
            name: 'GROUPING Legal',
            branch: {
              id: 11,
              name: 'Outback Paulista',
            },
          },
          {
            id: 129783,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback Paulista',
            },
          },
          {
            id: 12113,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback Paulista',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 2,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 932,
            className: 'Egg',
            name: 'EGG Massa',
            branch: {
              id: 11,
              name: 'Colgate Palmolive',
            },
          },
          {
            id: 12331231,
            className: 'Egg',
            name: 'EGG Maneiro',
            branch: {
              id: 11,
              name: 'Colgate Palmolive',
            },
          },
          {
            id: 12435353,
            className: 'Egg',
            name: 'EGG Bacana',
            branch: {
              id: 11,
              name: 'Colgate Palmolive',
            },
          },
          {
            id: 12655673,
            className: 'Egg',
            name: 'EGG Medidor',
            branch: {
              id: 11,
              name: 'Colgate Palmolive',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 3,
        name: 'nome da configuração do meu alerta maravilhoso',
        meters: [
          {
            id: 1287873,
            className: 'Branch',
            name: 'BRANCH Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 4,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 199823,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 5,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 6776,
            className: 'Egg',
            name: 'EGG Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 6,
        name: 'nome da configuração do meu alerta maravilhoso',
        meters: [
          {
            id: 7676676767,
            className: 'Branch',
            name: 'BRANCH Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 7,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 12444443,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 8,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 1212122,
            className: 'Egg',
            name: 'EGG Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 9,
        name: 'nome da configuração do meu alerta maravilhoso',
        meters: [
          {
            id: 123113,
            className: 'Branch',
            name: 'BRANCH Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 10,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 111212212123,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 11,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 3233211,
            className: 'Egg',
            name: 'EGG Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 12,
        name: 'nome da configuração do meu alerta maravilhoso',
        meters: [
          {
            id: 12123,
            className: 'Branch',
            name: 'BRANCH Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 13,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 102233,
            className: 'Grouping',
            name: 'GROUPING Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 14,
        name: 'nome da configuração do meu alerta',
        meters: [
          {
            id: 1112223,
            className: 'Egg',
            name: 'EGG Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
      {
        id: 15,
        name: 'nome da configuração do meu alerta maravilhoso',
        meters: [
          {
            id: 12211213446,
            className: 'Branch',
            name: 'BRANCH Massa',
            branch: {
              id: 11,
              name: 'Outback - Tatuapé',
            },
          },
        ],
        referenceParam: 'CONSUMPTION',
        reportInterval: 'ONE_WEEK',
        alertTime: '2018-06-04T12:00:00',
        resolved: 1,
      },
    ],
  },
};

const getExpandedTableColumns = () => [
  {
    title: 'Medidor/Grupo/Unidade',
    dataIndex: 'name',
    key: 'id',
  },
  {
    title: 'Unidade Associada',
    dataIndex: 'branch.name',
    key: 'branch.id',
  },
];

const AlertConfigurationList = ({ alertConfigurations, actionColumn }) => {
  const columns = getColumns(actionColumn);
  const expandedTableColumns = getExpandedTableColumns();
  return (
    <div className="alertConfiguration-list">
      <Table
        size="middle"
        expandedRowRender={(record) => (
          <Table
            columns={expandedTableColumns}
            dataSource={record.meters}
            rowKey={(data) => data.id}
            pagination={false}
            size="small"
            bordered={false}
          />
        )}
        dataSource={alertConfigurations}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

AlertConfigurationList.propTypes = {
  alertConfigurations: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default AlertConfigurationList;
