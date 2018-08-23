/**
 *
 * ConsumptionFareTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ConsumptionFareTimeLineByBranch from '../../containers/ConsumptionFareTimeLineByBranch/';
import './style.less';

const ConsumptionFareTab = ({ branchId }) => (
  <div className="consumption-fare-tab">
    <ConsumptionFareTimeLineByBranch branchId={branchId} />
  </div>
);

ConsumptionFareTab.propTypes = {
  branchId: PropTypes.number.isRequired,
};

export default ConsumptionFareTab;
