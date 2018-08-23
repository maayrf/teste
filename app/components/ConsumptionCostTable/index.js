/**
 *
 * ConsumptionCostTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { thereAreDataGraphic } from '../../utils/thereAreDataGraphic';
import './style.less';

const ConsumptionCostTable = ({
  rawData,
  handleData,
  nameColumn = 'Ocorrido em',
  renderColor,
  renderName,
}) => {
  if (!thereAreDataGraphic(rawData)) {
    return (
      <h1 className="_align-center">
        Não há nenhum dado para ser exibido nesta tabela!
      </h1>
    );
  }

  const formatedData = handleData(rawData);
  const dataSource = formatedData.tableData || formatedData;

  const columns = [
    {
      title: '',
      dataIndex: 'color',
      key: 'color',
      render: renderColor,
    },
    {
      title: nameColumn,
      dataIndex: 'name',
      key: 'name',
      render: renderName,
    },
    {
      title: 'Consumo',
      children: [
        {
          title: 'kWh',
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
          title: '%',
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
      ],
    },
    {
      title: 'Custo',
      children: [
        {
          title: 'R$',
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
          title: '%',
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
      ],
    },
  ];

  return (
    <Table
      className="ant-table-footer-bold table-border-head"
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record.id}
      pagination={false}
    />
  );
};

ConsumptionCostTable.propTypes = {
  rawData: PropTypes.object.isRequired,
  nameColumn: PropTypes.string,
  handleData: PropTypes.func.isRequired,
  renderColor: PropTypes.func.isRequired,
  renderName: PropTypes.func.isRequired,
};

export default ConsumptionCostTable;
