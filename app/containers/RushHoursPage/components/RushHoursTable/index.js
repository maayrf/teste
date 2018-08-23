/**
 * Tabela de Horas Produtivas e Não Produtivas
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { formatDataToRushHoursChartsAndTable } from '../../utils/formatDataToRushHoursChartsAndTable';
import { thereAreDataGraphic } from '../../../../utils/thereAreDataGraphic';
import LegendColorBoxByMeter from '../../../../components/LegendColorBoxByMeter/index';

const RushHoursTable = ({ dataSource }) => {
  if (!thereAreDataGraphic(dataSource)) {
    return (
      <h1 className="_align-center">
        Não há nenhum dado para ser exibido nesta tabela!
      </h1>
    );
  }
  const formatedRushHoursDataSource = formatDataToRushHoursChartsAndTable(dataSource);
  const columns = [
    {
      title: '',
      dataIndex: 'color',
      key: 'color',
      render: (value, info, index) =>
        info.name !== 'Total' ? <LegendColorBoxByMeter index={index} /> : null,
    },
    {
      title: 'Ocorrido em',
      dataIndex: 'name',
      key: 'name',
      render: (value, info) => {
        const defaultLabel = <span> {value} </span>;
        switch (info.name) {
          case 'Total':
            return <span className="_bold">Total</span>;
          case 'Horário de ponta':
            return defaultLabel;
          case 'Horário fora de ponta':
            return defaultLabel;
          default:
            return null;
        }
      },
    },
    {
      title: 'Valor de Consumo',
      dataIndex: 'consumption',
      key: 'consumption',
      render: (consumption, info) => {
        if (!consumption) {
          return null;
        }
        const formatedConsumption = `${info.consumption} ${
          info.consumptionUnit
        }`;
        return <span>{formatedConsumption}</span>;
      },
    },
    {
      title: 'Porcentagem de Consumo',
      dataIndex: 'consumptionPercentage',
      key: 'consumptionPercentage',
      render: (consumptionPercentage) => {
        if (!consumptionPercentage) {
          return null;
        }
        const formatedConsumptionPercentage = `${consumptionPercentage.toFixed(2)}%`;
        return <span>{formatedConsumptionPercentage}</span>;
      },
    },
    {
      title: 'Valor de Custo',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost, info) => {
        if (!cost) {
          return null;
        }
        const formatedCost = `${info.costUnit} ${info.cost.toFixed(2)}`;
        return <span>{formatedCost}</span>;
      },
    },
    {
      title: 'Porcentagem de Custo',
      dataIndex: 'costPercentage',
      key: 'costPercentage',
      render: (costPercentage) => {
        if (!costPercentage) {
          return null;
        }
        const formatedCostPercentage = `${costPercentage.toFixed(2)}%`;
        return <span>{formatedCostPercentage}</span>;
      },
    },
  ];

  if (formatedRushHoursDataSource.tableData) {
    return (
      <Table
        className="ant-table-footer-bold"
        dataSource={formatedRushHoursDataSource.tableData}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />
    );
  }
  return (
    <Table
      className="ant-table-footer-bold"
      dataSource={formatedRushHoursDataSource}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
};

RushHoursTable.propTypes = {
  dataSource: PropTypes.object.isRequired,
};
export default RushHoursTable;
