/**
 *
 * ConsumptionFareForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultFareForm from '../DefaultFareForm';

const UNITS_CONSUMPTION = ['kWh', 'MWh'];

class ConsumptionFareForm extends Component {
  constructor(props) {
    super(props);
    this.defaultFareForm = React.createRef();
  }
  render() {
    const fare = this.props.consumptionFare;
    return (
      <DefaultFareForm
        ref={this.defaultFareForm}
        fare={fare}
        units={UNITS_CONSUMPTION}
        {...this.props}
      />
    );
  }
}
ConsumptionFareForm.propTypes = {
  consumptionFare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number,
      tradeName: PropTypes.string,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    className: PropTypes.string,
    consumptionUnit: PropTypes.string,
    timeZone: PropTypes.string,
    rushStartTime: PropTypes.object,
    rushEndTime: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
  }),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ConsumptionFareForm;
