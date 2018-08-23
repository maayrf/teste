/**
 *
 * ConsumptionFareForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultFareForm from '../DefaultFareForm';

const UNITS_DEMAND_EXCEED = ['kW', 'MW'];

class DemandExceedFareForm extends Component {
  constructor(props) {
    super(props);
    this.defaultFareForm = React.createRef();
  }
  render() {
    const fare = this.props.demandExceedFare;
    return (
      <DefaultFareForm
        ref={this.defaultFareForm}
        fare={fare}
        units={UNITS_DEMAND_EXCEED}
        {...this.props}
      />
    );
  }
}

DemandExceedFareForm.propTypes = {
  demandExceedFare: PropTypes.shape({
    branch: PropTypes.shape({
      id: PropTypes.number.isRequired,
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

export default DemandExceedFareForm;
