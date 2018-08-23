/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * ForgetPassword Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import ForgetPasswordForm from './components/ForgetPasswordForm';
import {
  makeSelectError,
  makeSelectForgetPasswordLoading,
  makeSelectSuccess,
} from './selectors';
import { forgetPassword } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class ForgetPasswordModalContainer extends Component {
  state = {
    visible: false,
  };
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.messageTitle, error.message);
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon(
        'success',
        success.messageTitle,
        success.message
      );
      this.cancelModal();
    }
  }

  handleSubmit = (email) => {
    this.props.forgetPassword(email);
  };

  cancelModal = () => {
    this.setState({
      visible: false,
    });
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { handleSubmit, openModal, cancelModal } = this;
    const { loading } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <Link to="/login" onClick={() => openModal()}>
          Esqueci minha senha
        </Link>
        <Modal
          title="Recuperar senha"
          visible={visible}
          onCancel={cancelModal}
          footer={null}
        >
          <ForgetPasswordForm
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={cancelModal}
          />
        </Modal>
      </div>
    );
  }
}

ForgetPasswordModalContainer.propTypes = {
  forgetPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectForgetPasswordLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = {
  forgetPassword,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect)(ForgetPasswordModalContainer);
