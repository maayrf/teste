/**
 *
 * DemandFareTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import DemandFareTimeLineByBranch from '../../containers/DemandFareTimeLineByBranch/';
import './style.less';

const DemandFareTab = ({ branchId }) => (
  <div className="demand-fare-tab">
    <DemandFareTimeLineByBranch branchId={branchId} />
  </div>
);

DemandFareTab.propTypes = {
  branchId: PropTypes.number.isRequired,
};

export default DemandFareTab;
