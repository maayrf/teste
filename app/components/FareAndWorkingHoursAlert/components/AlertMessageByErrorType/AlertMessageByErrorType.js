import React from 'react';
import PropTypes from 'prop-types';
import {
  BRANCH_CONSUMPTION_FARE_NOT_FOUND,
  BRANCH_WORKING_HOUR_NOT_FOUND,
  EGG_WORKING_HOUR_NOT_FOUND,
} from '../../constants';
import AlertMessageContent from '../AlertMessageContent/AlertMessageContent';
import { BRANCHES_URL, METERS_URL } from '../../../../utils/constants';

const AlertMessageByErrorType = ({
  listOfBranchesOrEggsWithErrors,
  errorTypeToGetAlertOf,
}) => {
  switch (errorTypeToGetAlertOf) {
    case BRANCH_CONSUMPTION_FARE_NOT_FOUND:
      return (
        <AlertMessageContent
          descriptionOfBranchesOrEggs="As seguintes unidades não possuem tarifa cadastrada para o período selecionado:"
          listOfBranchesOrEggsWithErrors={
            listOfBranchesOrEggsWithErrors.branches
          }
          friendlyUrl={BRANCHES_URL}
        />
      );
    case BRANCH_WORKING_HOUR_NOT_FOUND:
      return (
        <AlertMessageContent
          descriptionOfBranchesOrEggs="As seguintes unidades não possuem quadro de horário de funcionamento cadastrado para o período selecionado:"
          listOfBranchesOrEggsWithErrors={
            listOfBranchesOrEggsWithErrors.branches
          }
          friendlyUrl={BRANCHES_URL}
        />
      );
    case EGG_WORKING_HOUR_NOT_FOUND:
      return (
        <AlertMessageContent
          descriptionOfBranchesOrEggs="Os seguintes medidores não possuem quadro de horário de funcionamento cadastrado para o período selecionado:"
          listOfBranchesOrEggsWithErrors={listOfBranchesOrEggsWithErrors.eggs}
          friendlyUrl={METERS_URL}
        />
      );
    default:
      return null;
  }
};

AlertMessageByErrorType.propTypes = {
  listOfBranchesOrEggsWithErrors: PropTypes.object.isRequired,
  errorTypeToGetAlertOf: PropTypes.string.isRequired,
};

export default AlertMessageByErrorType;
