/**
 *
 * RemoveAlertConfigurationConfirm
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Row } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeAlertConfiguration } from './actions';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectSuccess,
} from './selectors';
import './style.less';
import openNotificationWithIcon from '../../utils/antd-notification';

class RemoveAlertConfigurationConfirm extends Component {
  componentDidUpdate(prevProps) {
    const {
      error, success, onSuccess, onError,
    } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.message);
      if (onError) {
        onError(error);
      }
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      if (onSuccess) {
        onSuccess(success);
      }
    }
  }
  onConfirm = () => {
    this.props.removeAlertConfiguration(this.props.alertConfiguration.id);
  };
  render() {
    const { alertConfiguration, onCancel, loading } = this.props;
    const { onConfirm } = this;
    const title = `Tem certeza que deseja deletar Configuração de Alerta #${
      alertConfiguration.name
    }?`;
    return (
      <div className="remove-alert-configuration-confirm">
        <h2>
          <Icon type="exclamation-circle" style={{ color: '#f5222d' }} />
          <span>{title}</span>
        </h2>
        <Row type="flex" justify="end" gutter={8}>
          <div>
            {onCancel ? <Button onClick={onCancel}>Cancelar</Button> : ''}
          </div>
          <div>
            <Button type="danger" loading={loading} onClick={onConfirm}>
              Confirmar
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

RemoveAlertConfigurationConfirm.propTypes = {
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  onError: PropTypes.func,
  alertConfiguration: PropTypes.object.isRequired,
  removeAlertConfiguration: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  removeAlertConfiguration: (alertConfigurationId) =>
    new Promise((resolve, eject) =>
      dispatch(removeAlertConfiguration(alertConfigurationId, resolve, eject))),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'removeAlertConfiguration', reducer });
const withSaga = injectSaga({ key: 'removeAlertConfiguration', saga });

export default compose(withReducer, withSaga, withConnect)(RemoveAlertConfigurationConfirm);
