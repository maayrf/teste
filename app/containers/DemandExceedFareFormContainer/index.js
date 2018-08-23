/**
 *
 * DemandExceedFareFormContainer
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DemandExceedFareForm from '../../components/DemandExceedFareForm';

import {
  makeSelectError,
  makeSelectDemandExceedFareLoading,
  makeSelectSuccess,
} from './selectors';
import { createDemandExceedFare, editDemandExceedFare } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class DemandExceedFareFormContainer extends Component {
  constructor(props) {
    super(props);
    this.demandExceedForm = React.createRef();
  }
  componentDidUpdate(prevProps) {
    const {
      error, success, onSuccess, onError,
    } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.message);
      onError(error);
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      if (!this.isEditing()) {
        this.demandExceedForm.current.defaultFareForm.current
          .getForm()
          .resetFields();
      }
      onSuccess(success);
    }
  }
  isEditing = () => {
    const { demandExceedFare } = this.props;
    return demandExceedFare && demandExceedFare.id;
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (demandExceedFareValues) => {
    const { demandExceedFare } = this.props;
    if (demandExceedFare && demandExceedFare.id) {
      return this.props.editDemandExceedFare(demandExceedFareValues);
    }
    return this.props.createDemandExceedFare(demandExceedFareValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { ...restProps } = this.props;
    return (
      <DemandExceedFareForm
        ref={this.demandExceedForm}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        {...restProps}
      />
    );
  }
}

DemandExceedFareFormContainer.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
};

DemandExceedFareFormContainer.propTypes = {
  editDemandExceedFare: PropTypes.func.isRequired,
  createDemandExceedFare: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  demandExceedFare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    className: PropTypes.string,
    consumptionUnit: PropTypes.string,
    timeZone: PropTypes.string,
    rushStartTime: PropTypes.object,
    rushEndTime: PropTypes.object,
    rushValue: PropTypes.number,
    outRushValue: PropTypes.number,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectDemandExceedFareLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editDemandExceedFare: (demandExceedFare) =>
    dispatch(editDemandExceedFare(demandExceedFare)),
  createDemandExceedFare: (demandExceedFare) =>
    dispatch(createDemandExceedFare(demandExceedFare)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DemandExceedFareFormContainer);
