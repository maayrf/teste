/**
 *
 * MeterDetailOperatingHours
 *
 */

import React, { Component } from 'react';
import EggWorkingHoursContainer from '../../../../containers/WorkingHours/EggWorkingHoursContainer';
import PropTypes from 'prop-types';
import './style.less';

class EggDetailWorkingHours extends Component {
  render() {
    const { egg } = this.props;
    return (
      <div className="meter-detail-operating-hours">
        <EggWorkingHoursContainer eggId={egg.id} />
      </div>
    );
  }
}

EggDetailWorkingHours.propTypes = {};

export default EggDetailWorkingHours;
