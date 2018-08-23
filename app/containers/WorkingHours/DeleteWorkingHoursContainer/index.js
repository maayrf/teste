/**
 *
 * DeleteWorkingHours Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectDeleteWorkingHoursLoading,
  makeSelectDeleteSuccess,
} from './selectors';
import { deleteWorkingHours } from './actions';
import DeleteWorkingHoursButton from '../../../components/DeleteWorkingHoursModalButton/index';

class DeleteWorkingHoursContainer extends Component {
  onDelete = () => {
    const { workingHours, deleteWorkingHours, onDeleteSuccess } = this.props;
    deleteWorkingHours(workingHours, onDeleteSuccess);
  };

  render() {
    const { success, loading, workingHours } = this.props;
    return (
      <DeleteWorkingHoursButton
        workingHours={workingHours}
        loading={loading}
        success={success}
        onDelete={this.onDelete}
      />
    );
  }
}

DeleteWorkingHoursContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.object.isRequired,
  workingHours: PropTypes.object,
  onDeleteSuccess: PropTypes.func.isRequired,
  deleteWorkingHours: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectDeleteWorkingHoursLoading(),
  success: makeSelectDeleteSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  deleteWorkingHours: (workingHours, callback) =>
    dispatch(deleteWorkingHours(workingHours, callback)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DeleteWorkingHoursContainer);
