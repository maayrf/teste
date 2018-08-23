import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const ListOfBranchesOrEggsWithErrors = ({
  listOfBranchesOrEggsWithErrors,
  friendlyUrl,
}) => {
  const branchesOrEggsLiList = listOfBranchesOrEggsWithErrors.map((branchOrEgg, index) => (
    <li key={index}>
      <Link to={`${friendlyUrl}/${branchOrEgg.id}`}>{branchOrEgg.name}</Link>
    </li>
  ));
  return <ul> {branchesOrEggsLiList} </ul>;
};

ListOfBranchesOrEggsWithErrors.propTypes = {
  listOfBranchesOrEggsWithErrors: PropTypes.array.isRequired,
  friendlyUrl: PropTypes.string.isRequired,
};

export default ListOfBranchesOrEggsWithErrors;
