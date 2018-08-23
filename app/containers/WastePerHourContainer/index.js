import React from 'react';
import { Row, Col, Card } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import WastePerHourChart from '../../components/WastePerHourChart/index';
import { formatToDecimal } from '../../utils/formatNumber';

class WastePerHourContainer extends React.Component {
  hasWastePerHourData = (wastePerHour) => {
    if (
      wastePerHour &&
      wastePerHour.productiveHours &&
      wastePerHour.unproductiveHours &&
      wastePerHour.resume
    ) {
      return true;
    }
    return false;
  };
  render() {
    const { year, month, wastePerHour } = this.props;

    // Get the current month
    const currentMonthDate = moment(`${year}-${month}`);
    const currentMonth = currentMonthDate.format('MMMM/YYYY');
    if (!this.hasWastePerHourData(wastePerHour)) {
      return null;
    }
    const { unproductiveHours, resume } = wastePerHour;

    return (
      <div>
        <h5>DESPERDÍCIO POR HORÁRIO</h5>
        <Card className="dashboard-card">
          <Row type="flex" justify="center">
            <Col span={24}>
              <WastePerHourChart data={wastePerHour} />
            </Col>
            <Col span={24}>
              <h3>
                Em {currentMonth}{' '}
                <strong className="_uppercase">
                  {formatToDecimal(unproductiveHours.costPercentage)}%{' '}
                </strong>
                do custo ocorreu fora do horário produtivo, gerando{' '}
                <strong className="_uppercase">
                  {`${resume.economyUnit} ${formatToDecimal(resume.economy)}`}
                </strong>{' '}
                de potencial de economia imediata.
              </h3>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}
export default WastePerHourContainer;

WastePerHourContainer.propTypes = {
  wastePerHour: PropTypes.object,
  month: PropTypes.number,
  year: PropTypes.number,
};
