import React from 'react';
import PropTypes from 'prop-types';
import ListOfBranchesOrEggsWithErrors from '../ListOfBranchesOrEggsWithErrors/ListOfBranchesOrEggsWithErrors';

const AlertMessageContent = ({
  descriptionOfBranchesOrEggs,
  listOfBranchesOrEggsWithErrors,
  friendlyUrl,
}) => (
  <div key={Math.random().toString()}>
    <h3>{descriptionOfBranchesOrEggs}</h3>
    <ListOfBranchesOrEggsWithErrors
      listOfBranchesOrEggsWithErrors={listOfBranchesOrEggsWithErrors}
      friendlyUrl={friendlyUrl}
    />
  </div>
);

AlertMessageContent.propTypes = {
  descriptionOfBranchesOrEggs: PropTypes.string.isRequired,
  listOfBranchesOrEggsWithErrors: PropTypes.array.isRequired,
  friendlyUrl: PropTypes.string.isRequired,
};

export default AlertMessageContent;
