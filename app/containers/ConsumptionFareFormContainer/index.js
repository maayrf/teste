/**
 *
 * ConsumptionFare Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ConsumptionFareForm from '../../components/ConsumptionFareForm';

import {
  makeSelectError,
  makeSelectConsumptionFareLoading,
  makeSelectSuccess,
} from './selectors';
import { createConsumptionFare, editConsumptionFare } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class ConsumptionFareFormContainer extends Component {
  constructor(props) {
    super(props);
    this.consumptionForm = React.createRef();
  }
  componentDidUpdate(prevProps) {
    const { error, success, onSuccess } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.message);
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      if (!this.isEditing()) {
        this.consumptionForm.current.defaultFareForm.current
          .getForm()
          .resetFields();
      }
      onSuccess(success);
    }
  }
  isEditing = () => {
    const { consumptionFare } = this.props;
    return consumptionFare && consumptionFare.id;
  };
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (consumptionFareValues) => {
    const { consumptionFare } = this.props;
    if (consumptionFare && consumptionFare.id) {
      return this.props.editConsumptionFare(consumptionFareValues);
    }
    return this.props.createConsumptionFare(consumptionFareValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { ...restProps } = this.props;

    return (
      <ConsumptionFareForm
        ref={this.consumptionForm}
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

ConsumptionFareFormContainer.defaultProps = {
  onSuccess: () => {},
};

ConsumptionFareFormContainer.propTypes = {
  editConsumptionFare: PropTypes.func.isRequired,
  createConsumptionFare: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  consumptionFare: PropTypes.shape({
    id: PropTypes.number,
    branch: PropTypes.shape({
      id: PropTypes.number,
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
  loading: makeSelectConsumptionFareLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editConsumptionFare: (consumptionFare) =>
    dispatch(editConsumptionFare(consumptionFare)),
  createConsumptionFare: (consumptionFare) =>
    dispatch(createConsumptionFare(consumptionFare)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ConsumptionFareFormContainer);
