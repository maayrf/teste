import React from 'react';
import { Row, Col, Card } from 'antd';
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import CostStructureChart from '../../components/CostStructureChart/index';
import { formatToDecimal } from '../../utils/formatNumber';

class CostStructureContainer extends React.Component {
  hasCostStructureData = (costStructure) => {
    if (
      costStructure &&
      costStructure.costStructureChartValues &&
      costStructure.productiveHours &&
      costStructure.unproductiveHours
    ) {
      return true;
    }
    return false;
  };
  render() {
    const { year, month, costStructure } = this.props;

    // Get the current month
    const currentMonthDate = moment(`${year}-${month}`);
    const currentMonth = currentMonthDate.format('MMMM/YYYY');
    if (!this.hasCostStructureData(costStructure)) {
      return null;
    }
    const { productiveHours } = costStructure;

    return (
      <div>
        <h5>ESTRUTURA DE CUSTOS</h5>
        <Card className="dashboard-card">
          <Row type="flex" align="left">
            <Col span={24}>
              <CostStructureChart currency="R$" costStructure={costStructure} />
            </Col>
          </Row>
          <Row>
            <h3>
              {`${formatToDecimal(productiveHours.consumptionPercentage)}%`} do
              consumo ocorreu em horário de ponta e gerou{' '}
              {`${formatToDecimal(productiveHours.costPercentage)}%`} do custo
              em {currentMonth}
            </h3>
          </Row>
        </Card>
      </div>
    );
  }
}
export default CostStructureContainer;

CostStructureContainer.propTypes = {
  costStructure: PropTypes.object,
  month: PropTypes.number,
  year: PropTypes.number,
};
