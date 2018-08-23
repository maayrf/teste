/**
 *
 * DemandExceedFareTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import DemandExceedFareTimeLineByBranch from '../../containers/DemandExceedFareTimeLineByBranch/';
import './style.less';

const DemandExceedFareTab = ({ branchId }) => (
  <div className="demand-exceed-fare-tab">
    <DemandExceedFareTimeLineByBranch branchId={branchId} />
  </div>
);

DemandExceedFareTab.propTypes = {
  branchId: PropTypes.number.isRequired,
};

export default DemandExceedFareTab;
