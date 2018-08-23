/**
 *
 * WorkingHours
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Icon, Row } from 'antd';
import moment from 'moment';
import TimeSheet from '../TimeSheet/index';
import './style.less';
import IconUnit from '../Icons/IconUnit';
import DatesInterval from '../DatesInterval/index';

const LABEL_BY_METER_TYPE = {
  Branch: { label: 'Unidade', color: '#59b5dd' },
  Egg: { label: 'Customizado/Medidor', color: '#90c354' },
};
class WorkingHours extends Component {
  getMeterTypeLabel = () => {
    const {
      belongsTo: { className: meterType },
    } = this.props.workingHours;
    switch (meterType.toLowerCase()) {
      case 'branch':
        return 'Unidade';
      case 'egg':
        return 'Medidor';
      default:
        return '';
    }
  };
  renderError = () => {
    const { workingHours, renderOnErrorBody } = this.props;
    const meterTypeLabel = this.getMeterTypeLabel();
    return <div> ERRO que só aparece quando não usamos o TimeLineList</div>;
    // return (
    //   <Alert
    //     message={`Não há horário produtivo cadastrado nesse intervalo de tempo para esta ${meterTypeLabel}.`}
    //     type="warning"
    //     description={renderOnErrorBody(workingHours)}
    //     showIcon
    //   />
    // );
  };

  renderTimeSheet = () => {
    const { workingHours } = this.props;
    return <TimeSheet weekHours={workingHours.workingHours} />;
  };

  renderBelongsTo = () => {
    const {
      workingHours: {
        belongsTo: { className, name },
      },
    } = this.props;
    return (
      <Row type="flex" align="middle" gutter={5}>
        {className !== 'Branch' ? (
          <Icon
            type="wifi"
            style={{ color: LABEL_BY_METER_TYPE[className].color }}
          />
        ) : (
          <IconUnit fill={LABEL_BY_METER_TYPE[className].color} />
        )}
        <strong style={{ color: LABEL_BY_METER_TYPE[className].color }}>
          {LABEL_BY_METER_TYPE[className].label}
        </strong>
        <span>{name}</span>
      </Row>
    );
  };
  render() {
    const { workingHours, renderOnHeader } = this.props;

    return (
      <div className="branch-working-hours">
        <Row
          type="flex"
          justify="space-between"
          className="_margin-bottom"
          align="middle"
        >
          <Col>
            <Row gutter={20} type="flex">
              <Col>
                <div className="label-date-interval">
                  <DatesInterval
                    startDate={workingHours.startDate}
                    endDate={workingHours.endDate}
                  />
                </div>
              </Col>
              <Col>{this.renderBelongsTo()}</Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={20} type="flex" align="middle">
              {renderOnHeader(workingHours)}
            </Row>
          </Col>
        </Row>
        {workingHours.errorType ? this.renderError() : this.renderTimeSheet()}
      </div>
    );
  }
}

WorkingHours.propTypes = {
  workingHours: PropTypes.object.isRequired,
  renderOnHeader: PropTypes.func,
  renderOnErrorBody: PropTypes.func,
};

WorkingHours.defaultProps = {
  renderOnHeader: () => {},
  renderOnErrorBody: () => {},
};

export default WorkingHours;
