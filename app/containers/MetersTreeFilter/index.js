/**
 *
 * Meters Tree Filter
 *
 */
import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';
import PropTypes from 'prop-types';

import SelectMetersButtonContainer from '../SelectMetersButtonContainer';
import DateRangePicker from '../../components/DateRangePicker';
import ScaleDescription from '../../components/ScaleDescription/index';
import {
  DEFAULT_SCALE_VISUALIZATION_DESCRIPTIONS,
  DEFAULT_SCALE_VISUALIZATION_OPTIONS,
} from './constants';
const RadioGroup = Radio.Group;

class MetersTreeFilter extends Component {
  handleDateRangeChange = (rangeDates) => {
    this.props.onChange({
      ...this.props.value,
      rangeDates,
    });
  };
  handleScaleChange = ({ target: { value: scaleVisualization } }) => {
    this.props.onChange({
      ...this.props.value,
      rangeDates: [null, null],
      scaleVisualization,
    });
  };
  handleChangeCheckedMeters = (selectMetersButton) => {
    this.props.onChange({
      ...this.props.value,
      selectMetersButton,
    });
  };
  shouldShowDescription = () => {
    const { showDescription } = this.props;
    if (!showDescription) return false;
    return true;
  };

  render() {
    const {
      scaleVisualizationOptions,
      scaleVisualizationDescriptions,
    } = this.props;

    const {
      selectMetersButton: { companyId, checkedMeters },
      scaleVisualization,
      rangeDates: [startDate, endDate],
    } = this.props.value;
    const disabled = !scaleVisualization;
    return (
      <div>
        <Row type="flex" gutter={30} align="middle" className="_margin-bottom">
          <Col>
            <SelectMetersButtonContainer
              value={{ companyId, checkedMeters }}
              onChange={this.handleChangeCheckedMeters}
            />
          </Col>
          <Col>
            <Row type="flex" gutter={20}>
              <Col>
                <h3>Escala de Visualização</h3>
                <RadioGroup
                  options={scaleVisualizationOptions}
                  value={scaleVisualization}
                  onChange={this.handleScaleChange}
                />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <DateRangePicker
                      value={[startDate, endDate]}
                      disabled={disabled}
                      step={scaleVisualization}
                      onChange={this.handleDateRangeChange}
                    />
                  </Col>
                  <Col>
                    <ScaleDescription
                      scaleVisualization={scaleVisualization}
                      descriptions={scaleVisualizationDescriptions}
                      showDescription={this.shouldShowDescription()}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

MetersTreeFilter.defaultProps = {
  onChange: () => {},
  value: {
    scaleVisualization: null,
    selectMetersButton: {
      companyId: null,
      checkedMeters: [],
    },
    rangeDates: [null, null],
  },
  showDescription: true,
  scaleVisualizationOptions: DEFAULT_SCALE_VISUALIZATION_OPTIONS,
  scaleVisualizationDescriptions: DEFAULT_SCALE_VISUALIZATION_DESCRIPTIONS,
};

MetersTreeFilter.propTypes = {
  value: PropTypes.shape({
    scaleVisualization: PropTypes.string,
    selectMetersButton: PropTypes.shape({
      companyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      checkedMeters: PropTypes.array,
    }),
    rangeDates: PropTypes.array,
  }),
  showDescription: PropTypes.bool,
  onChange: PropTypes.func,
  scaleVisualizationOptions: PropTypes.array,
  scaleVisualizationDescriptions: PropTypes.array,
};

export default MetersTreeFilter;
