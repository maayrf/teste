/**
 *
 * FareAndWorkingHoursAlert
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { isEmpty } from 'lodash';
import AlertMessageByErrorType from './components/AlertMessageByErrorType/AlertMessageByErrorType';

const FareAndWorkingHoursAlert = ({ fareAndWorkingHoursErrors }) => {
  if (isEmpty(fareAndWorkingHoursErrors)) {
    return null;
  }
  const messages = fareAndWorkingHoursErrors.map((listOfBranchesOrEggsWithErrors, index) => (
    <AlertMessageByErrorType
      listOfBranchesOrEggsWithErrors={listOfBranchesOrEggsWithErrors}
      errorTypeToGetAlertOf={listOfBranchesOrEggsWithErrors.type}
      key={index}
    />
  ));

  return (
    <div className="_margin-bottom">
      <Alert message="Atenção" description={messages} type="warning" showIcon />
    </div>
  );
};

FareAndWorkingHoursAlert.propTypes = {
  fareAndWorkingHoursErrors: PropTypes.array,
};

export default FareAndWorkingHoursAlert;
