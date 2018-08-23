/**
 *
 * MeterNetwork Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MeterNetworkForm from '../../components/MeterNetworkForm';

import {
  makeSelectError,
  makeSelectMeterNetworkLoading,
  makeSelectSuccess,
} from './selectors';
import { createMeterNetwork, editMeterNetwork } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import { loadMeterNetworkConfigurations } from '../MeterNetworkConfigurationListContainer/actions';

class MeterNetworkFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      this.props.loadMeterNetworkConfigurations();
      this.props.onSuccess();
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (meterNetworkValues) => {
    const { meterNetwork, meterId } = this.props;
    if (meterNetwork.id) {
      return this.props.editMeterNetwork(meterNetworkValues, meterId);
    }
    return this.props.createMeterNetwork(meterNetworkValues, meterId);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { error, success, ...restProps } = this.props;
    return (
      <MeterNetworkForm
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

MeterNetworkFormContainer.propTypes = {
  editMeterNetwork: PropTypes.func.isRequired,
  createMeterNetwork: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  meterNetwork: PropTypes.shape({
    id: PropTypes.number,
    securityProtocol: PropTypes.string,
    EPAMethod: PropTypes.string,
    phaseTwoAuthentication: PropTypes.string,
    provisioning: PropTypes.string,
    nameNetwork: PropTypes.string,
    password: PropTypes.string,
    certificateCA: PropTypes.string,
    identity: PropTypes.string,
    identityAnonymous: PropTypes.string,
  }),
  meterId: PropTypes.number.isRequired,
  loadMeterNetworkConfigurations: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

MeterNetworkFormContainer.defaultProps = {
  meterNetwork: {
    securityProtocol: '',
    EPAMethod: '',
    phaseTwoAuthentication: '',
    provisioning: '',
    nameNetwork: '',
    password: '',
    certificateCA: '',
    identity: '',
    identityAnonymous: '',
  },
  onSuccess: () => {},
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectMeterNetworkLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editMeterNetwork: (meterNetwork, meterId) =>
    dispatch(editMeterNetwork(meterNetwork, meterId)),
  createMeterNetwork: (meterNetwork, meterId) =>
    dispatch(createMeterNetwork(meterNetwork, meterId)),
  loadMeterNetworkConfigurations: () =>
    dispatch(loadMeterNetworkConfigurations()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect)(MeterNetworkFormContainer);
