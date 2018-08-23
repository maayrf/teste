/**
 *
 * DemandFareForm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultFareForm from '../DefaultFareForm';

const UNITS_DEMAND = ['kW', 'MW'];

class DemandFareForm extends Component {
  constructor(props) {
    super(props);
    this.defaultFareForm = React.createRef();
  }
  render() {
    const fare = this.props.demandFare;
    return (
      <DefaultFareForm
        ref={this.defaultFareForm}
        fare={fare}
        units={UNITS_DEMAND}
        {...this.props}
      />
    );
  }
}

DemandFareForm.propTypes = {
  demandFare: PropTypes.shape({
    branch: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    id: PropTypes.number,
    startDate: PropTypes.object,
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

export default DemandFareForm;
