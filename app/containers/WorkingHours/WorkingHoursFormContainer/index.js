/**
 *
 * WorkingHours Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import WorkingHoursForm from '../../../components/WorkingHoursForm/index';

import {
  makeSelectError,
  makeSelectWorkingHoursLoading,
  makeSelectSuccess,
} from './selectors';
import { createWorkingHours, editWorkingHours } from './actions';
import { loadCurrentBranchWorkingHours } from '../CurrentBranchWorkingHoursContainer/actions';
import { loadPaginatedInfoOfBranchOrMeterWorkingHours } from '../BranchWorkingHoursContainer/actions';
import { loadCurrentEggWorkingHours } from '../CurrentEggWorkingHoursContainer/actions';
import { loadPaginatedInfoOfEggWorkingHours } from '../EggWorkingHoursContainer/actions';
import { typeBranch, typeEgg } from './constants';
import openNotificationWithIcon from '../../../utils/antd-notification';

class WorkingHoursFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.message);
    }
    if (success !== prevProps.success) {
      this.handleCancel();
      this.props.onSuccess(success);
    }
  }

  handleCancel = () => {
    this.props.onCancel();
  };

  onCreateSuccess = (workingHour) => {
    openNotificationWithIcon(
      'success',
      `Quadro de horário ${workingHour.id} cadastrado com sucesso!`
    );
    this.reloadWorkingHours();
  };
  onEditSuccess = (workingHour) => {
    openNotificationWithIcon(
      'success',
      `Quadro de horário ${workingHour.id} editado com sucesso!`
    );
    this.reloadWorkingHours();
  };

  reloadWorkingHours = () => {
    const {
      workingHours: {
        belongsTo: { className: meterType, id },
      },
    } = this.props;

    const { loadBranchWorkingHours, loadEggWorkingHours } = this.props;
    const params = {
      paginationStart: 0,
      paginationNumber: 15,
    };

    switch (meterType) {
      case typeEgg:
        loadEggWorkingHours(id, params);
        this.props.loadCurrentEggWorkingHours(id);
        break;
      case typeBranch:
        loadBranchWorkingHours(id, params);
        this.props.loadCurrentBranchWorkingHours(id);
        break;
      default:
        break;
    }
  };

  isEditing = (workingHours) => {
    if (workingHours && !isNaN(workingHours.id)) return true;
    return false;
  };

  handleSubmit = (workingHoursValues) => {
    const { workingHours } = this.props;
    const { onCreateSuccess, onEditSuccess } = this;

    if (this.isEditing(workingHours)) {
      return this.props.editWorkingHours(
        workingHoursValues,
        onEditSuccess,
        workingHours.belongsTo.className,
        workingHours.belongsTo.id
      );
    }
    return this.props.createWorkingHours(
      workingHoursValues,
      onCreateSuccess,
      workingHours.belongsTo.className,
      workingHours.belongsTo.id
    );
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const {
      error, success, workingHours, ...restProps
    } = this.props;
    return (
      <WorkingHoursForm
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        workingHours={workingHours}
      />
    );
  }
}

WorkingHoursFormContainer.defaultProps = {
  workingHours: null,
  onCancel: () => {},
  onSuccess: () => {},
};

WorkingHoursFormContainer.propTypes = {
  onSuccess: PropTypes.func,
  customValidation: PropTypes.func,
  onCancel: PropTypes.func,
  editWorkingHours: PropTypes.func.isRequired,
  createWorkingHours: PropTypes.func.isRequired,
  loadCurrentBranchWorkingHours: PropTypes.func.isRequired,
  loadBranchWorkingHours: PropTypes.func.isRequired,
  loadCurrentEggWorkingHours: PropTypes.func.isRequired,
  loadEggWorkingHours: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  workingHours: PropTypes.shape({
    id: PropTypes.number,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    workingHours: PropTypes.array,
    belongsTo: PropTypes.shape({
      className: PropTypes.string,
    }),
  }),
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectWorkingHoursLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editWorkingHours: (workingHours, onEditSuccess, meterType, meterId) =>
    dispatch(editWorkingHours(workingHours, onEditSuccess, meterType, meterId)),
  createWorkingHours: (workingHours, onCreateSuccess, meterType, meterId) =>
    dispatch(createWorkingHours(workingHours, onCreateSuccess, meterType, meterId)),
  loadCurrentBranchWorkingHours: (branchId) =>
    dispatch(loadCurrentBranchWorkingHours(branchId)),
  loadBranchWorkingHours: (branchId, params) =>
    dispatch(loadPaginatedInfoOfBranchOrMeterWorkingHours(branchId, params)),
  loadCurrentEggWorkingHours: (eggId) =>
    dispatch(loadCurrentEggWorkingHours(eggId)),
  loadEggWorkingHours: (eggId, params) =>
    dispatch(loadPaginatedInfoOfEggWorkingHours(eggId, params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(compose(withConnect)(WorkingHoursFormContainer));
