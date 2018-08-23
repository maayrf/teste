/**
 *
 * User Remove Container
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
  makeSelectSuccess,
  makeSelectUserRemoveLoading,
} from './selectors';
import { removeUser } from './actions';
import userRemoveReducer from './reducer';
import userRemoveSaga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import UserRemoveModalButtonContent from '../../components/UserRemoveModalButton/UserRemoveModalButtonContent';

class UserRemoveContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.message);
    }
    if (prevProps.success !== success) {
      if (success) {
        if (this.props.onSuccess) {
          this.props.onSuccess(success);
        } else {
          openNotificationWithIcon('success', success.message);
        }
      }
    }
  }
  onSubmit = (id) => {
    this.props.removeUser(id);
  };
  render() {
    const { loading, ...restProps } = this.props;
    return (
      <div className="user-remove-button-page">
        <UserRemoveModalButtonContent
          loading={loading}
          {...restProps}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

UserRemoveContainer.propTypes = {
  error: PropTypes.object,
  success: PropTypes.object,
  onSuccess: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
  loading: makeSelectUserRemoveLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  removeUser: (id) => dispatch(removeUser(id)),
});

const withUserRemoveReducer = injectReducer({
  key: 'userRemove',
  reducer: userRemoveReducer,
});
const withUSerRemoveSaga = injectSaga({
  key: 'userRemove',
  saga: userRemoveSaga,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withUserRemoveReducer, withUSerRemoveSaga, withConnect)(UserRemoveContainer);
