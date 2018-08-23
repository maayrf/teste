/* eslint-disable no-shadow */
/**
 *
 * Validate Input Email Container
 *
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectAvailableEmail,
  makeSelectValidateInputEmailsLoading,
} from './selectors';
import { loadValidateInputEmails } from './actions';
import reducer from './reducer';
import saga from './saga';
import ValidateInputEmail from '../../components/ValidateInputEmail/index';
import openNotificationWithIcon from '../../utils/antd-notification';
import { validateEmail } from '../../utils/validation';

class ValidateInputEmailContainer extends Component {
  componentDidMount() {
    this.initialValue = this.props.value;
  }
  componentDidUpdate(prevProps) {
    const {
      error,
      availableEmail,
      value: { value, verified },
      loading,
    } = this.props;

    if (error) {
      openNotificationWithIcon('error', error.message);
    }

    if (
      prevProps.availableEmail.success !== availableEmail.success ||
      prevProps.loading !== loading
    ) {
      this.props.onChange({
        loading,
        verified:
          prevProps.availableEmail.success !== availableEmail.success
            ? verified
            : true,
        value,
        error:
          availableEmail.success === false
            ? 'Este email não está disponível'
            : null,
      });
    }
  }
  handleChange = ({ target: { value } }) => {
    const {
      loading,
      value: { error },
    } = this.props;
    this.props.onChange({
      loading,
      error,
      value,
      verified: false,
    });
  };
  handleBlur = ({ target: { value } }) => {
    if (!validateEmail(value)) {
      const {
        loading,
        value: { verified },
      } = this.props;
      return this.props.onChange({
        verified,
        loading,
        value,
        error: 'Insira um email válido!',
      });
    }
    if (value !== this.initialValue) {
      this.props.loadValidateInputEmails(value);
    }
  };
  render() {
    const {
      error,
      loadValidateInputEmails,
      loading,
      value: { value, verified },
      ...restProps
    } = this.props;
    return (
      <ValidateInputEmail
        {...restProps}
        loading={loading}
        verified={verified}
        value={value}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
}

ValidateInputEmailContainer.propTypes = {
  error: PropTypes.object,
  availableEmail: PropTypes.shape({
    success: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  loadValidateInputEmails: PropTypes.func.isRequired,
  value: PropTypes.shape({
    value: PropTypes.string,
    loading: PropTypes.bool,
  }),
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
};

ValidateInputEmailContainer.defaulProps = {
  onChange: () => {},
  value: { value: '' },
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  availableEmail: makeSelectAvailableEmail(),
  loading: makeSelectValidateInputEmailsLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadValidateInputEmails: (email) => dispatch(loadValidateInputEmails(email)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'availableEmail', reducer });
const withSaga = injectSaga({ key: 'availableEmail', saga });
export default compose(withReducer, withSaga, withConnect)(ValidateInputEmailContainer);
