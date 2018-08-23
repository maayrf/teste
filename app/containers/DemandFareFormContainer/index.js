/**
 *
 * DemandFareFormContainer
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DemandFareForm from '../../components/DemandFareForm';

import {
  makeSelectError,
  makeSelectDemandFareLoading,
  makeSelectSuccess,
} from './selectors';
import { createDemandFare, editDemandFare } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class DemandFareFormContainer extends Component {
  constructor(props) {
    super(props);
    this.demandForm = React.createRef();
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
        this.demandForm.current.defaultFareForm.current.getForm().resetFields();
      }
      onSuccess(success);
    }
  }

  handleCancel = () => {
    this.props.onCancel();
  };
  isEditing = () => {
    const { demandFare } = this.props;
    return demandFare && demandFare.id;
  };
  handleSubmit = (demandFareValues) => {
    if (this.isEditing()) {
      return this.props.editDemandFare(demandFareValues);
    }
    return this.props.createDemandFare(demandFareValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { ...restProps } = this.props;
    return (
      <DemandFareForm
        ref={this.demandForm}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        {...restProps}
      />
    );
  }
}

DemandFareFormContainer.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
};

DemandFareFormContainer.propTypes = {
  editDemandFare: PropTypes.func.isRequired,
  createDemandFare: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  demandFare: PropTypes.shape({
    branch: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    id: PropTypes.number,
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
  loading: makeSelectDemandFareLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editDemandFare: (demandExceedFare) =>
    dispatch(editDemandFare(demandExceedFare)),
  createDemandFare: (demandExceedFare) =>
    dispatch(createDemandFare(demandExceedFare)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DemandFareFormContainer);
