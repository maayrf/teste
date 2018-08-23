/**
 *
 * DisableDemandFare Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment/moment';
import DisableFareModalButton from '../../components/DisableFareModalButton';
import {
  makeSelectError,
  makeSelectDisableDemandFareLoading,
  makeSelectSuccess,
} from './selectors';
import { editDisableDemandFare } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class DisableDemandFareFormContainer extends Component {
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
  handleSubmit = (demandFareValues) => {
    const { demandFare } = this.props;
    const disableDemandFare = {
      id: demandFareValues.id,
      endDate: moment(demandFareValues.endDate).format('YYYY-MM-DD'),
    };
    if (demandFare.id) {
      return this.props.editDisableDemandFare(disableDemandFare);
    }
    return null;
  };
  render() {
    const { handleSubmit } = this;
    const { demandFare, ...restProps } = this.props;
    return (
      <DisableFareModalButton
        fareData={demandFare}
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

DisableDemandFareFormContainer.propTypes = {
  editDisableDemandFare: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  demandFare: PropTypes.shape({
    id: PropTypes.number,
    endDate: PropTypes.object,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectDisableDemandFareLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editDisableDemandFare: (demandFare) =>
    dispatch(editDisableDemandFare(demandFare)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DisableDemandFareFormContainer);
