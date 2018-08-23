/**
 *
 * DisableDemandExceedFare Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  makeSelectError,
  makeSelectDisableDemandExceedFareLoading,
  makeSelectSuccess,
} from './selectors';
import { editDisableDemandExceedFare } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import DisableFareModalButton from '../../components/DisableFareModalButton/index';

class DisableDemandExceedFareFormContainer extends Component {
  state = {
    visible: false,
  };

  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error);
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
    }
  }
  handleOpen = () => this.setState({ visible: true });
  handleCancel = () => this.setState({ visible: false });
  handleSubmit = (demandExceedFareValues) => {
    const { demandExceedFare } = this.props;
    const disableDemandExceedFare = {
      id: demandExceedFareValues.id,
      endDate: moment(demandExceedFareValues.endDate).format('YYYY-MM-DD'),
    };
    if (demandExceedFare.id) {
      return this.props.editDisableDemandExceedFare(disableDemandExceedFare);
    }
    return null;
  };
  render() {
    const { handleSubmit } = this;
    const { demandExceedFare, ...restProps } = this.props;
    return (
      <DisableFareModalButton
        fareData={demandExceedFare}
        title="Desabilitar Tarifa"
        onSubmit={handleSubmit}
        visible={this.state.visible}
        onOpen={this.handleOpen}
        onCancel={this.handleCancel}
        {...restProps}
      />
    );
  }
}

DisableDemandExceedFareFormContainer.propTypes = {
  editDisableDemandExceedFare: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  demandExceedFare: PropTypes.shape({
    id: PropTypes.number,
    endDate: PropTypes.object,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectDisableDemandExceedFareLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editDisableDemandExceedFare: (demandExceedFare) =>
    dispatch(editDisableDemandExceedFare(demandExceedFare)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DisableDemandExceedFareFormContainer);
