/**
 *
 * User Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import reducer from './reducer';

import UserForm from '../../components/UserForm';

import {
  makeSelectError,
  makeSelectUserLoading,
  makeSelectSuccess,
} from './selectors';
import { createUser, editUser, editMyProfile } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeSelectCurrentUser } from '../LoginPage/selectors';

class UserFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const {
      error, success, onSuccess, onError,
    } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
      onError(error);
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
      onSuccess(success);
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (userValues) => {
    const { user, isMyUser } = this.props;
    if (user && user.id) {
      return this.props.editUser(userValues);
    } else if (user && isMyUser) {
      return this.props.editMyProfile(userValues);
    }
    return this.props.createUser(userValues);
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const {
      error, success, formComponent, ...restProps
    } = this.props;
    const FormComponent = formComponent || UserForm;
    return (
      <FormComponent
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

UserFormContainer.propTypes = {
  isMyUser: PropTypes.bool,
  formComponent: PropTypes.any,
  editUser: PropTypes.func.isRequired,
  editMyProfile: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  error: PropTypes.object,
  success: PropTypes.object,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  user: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
};

UserFormContainer.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectUserLoading(),
  success: makeSelectSuccess(),
  currentUser: makeSelectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  editUser: (user) => dispatch(editUser(user)),
  editMyProfile: (user) => dispatch(editMyProfile(user)),
  createUser: (user) => dispatch(createUser(user)),
});

const withReducer = injectReducer({ key: 'userForm', reducer });
const withSaga = injectSaga({ key: 'userForm', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(UserFormContainer);
