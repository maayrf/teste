/**
 *
 * PerformanceConfigurationList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import {
  CONSUMPTION_NOT_PRODUCTIVE_HOURS,
  CONSUMPTION_OFF_PEAK,
  CONSUMPTION_PEAK,
  CONSUMPTION_PRODUCTIVE_HOURS,
  CONSUMPTION_TOTAL,
  ONE_WEEK,
  ONE_MONTH,
  WEEKLY,
  MONTHLY,
} from '../../containers/PerformanceConfigurationListContainer/constants';
import './style.less';

const getColumns = (actionColumn) => {
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Medidor/Grupo/Unidade',
      dataIndex: 'meter',
      key: 'meter',
      render: (meter) => showMeterName(meter),
    },
    {
      title: 'Unidade de Medida',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Parametro de Referência',
      dataIndex: 'referenceParam',
      key: 'referenceParam',
      render: (value) => showReferenceParam(value),
    },
    {
      title: 'Frequência do Relatório',
      dataIndex: 'reportInterval',
      key: 'reportInterval',
      render: (value) => showReportFrequency(value),
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

const showMeterName = (meter) => {
  switch (meter.className) {
    case 'Branch':
      return meter.tradename;
    default:
      return meter.name;
  }
};

const showReferenceParam = (value) => {
  switch (value) {
    case CONSUMPTION_TOTAL:
      return 'Consumo total';
    case CONSUMPTION_PRODUCTIVE_HOURS:
      return 'Consumo em horário produtivo';
    case CONSUMPTION_NOT_PRODUCTIVE_HOURS:
      return 'Consumo em horário não produtivo';
    case CONSUMPTION_OFF_PEAK:
      return 'Consumo fora de ponta';
    case CONSUMPTION_PEAK:
      return 'Consumo de ponta';
    default:
      return '';
  }
};

const showReportFrequency = (value) => {
  switch (value) {
    case ONE_WEEK:
      return WEEKLY;
    case ONE_MONTH:
      return MONTHLY;
    default:
      return '';
  }
};

const PerformanceConfigurationList = ({
  performanceConfigurations,
  actionColumn,
}) => {
  const columns = getColumns(actionColumn);
  return (
    <div className="performance-configuration-list">
      <Table
        className="performance-configuration-table"
        size="middle"
        dataSource={performanceConfigurations}
        columns={columns}
        pagination={false}
        rowKey={(dataSource) => dataSource.id}
      />
    </div>
  );
};

PerformanceConfigurationList.propTypes = {
  performanceConfigurations: PropTypes.array.isRequired,
  actionColumn: PropTypes.func,
};

export default PerformanceConfigurationList;
