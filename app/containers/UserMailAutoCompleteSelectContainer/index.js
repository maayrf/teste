/**
 *
 * User Mail Auto Complete Container
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
  makeSelectUserMailAutoCompletes,
  makeSelectUserMailAutoCompletesLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadUserMailAutoCompletes } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import UserMailAutoCompleteSelect from '../../components/UserMailAutoCompleteSelect';
import { debounce } from 'lodash';

class UserMailAutoCompleteSelectContainer extends Component {
  static defaultProps = {
    onChange: () => {},
  };

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }
  onChange = (value) => {
    this.props.onChange(value);
  };

  searchUsers = (searchString) => {
    this.props.loadUserMailAutoCompletes({
      searchString,
    });
  };

  render() {
    const { loading, users } = this.props;
    return (
      <div className="user-mail-auto-complete">
        <UserMailAutoCompleteSelect
          mode="tags"
          loading={loading}
          users={users}
          onSearch={debounce(this.searchUsers, 300)}
          onChange={this.onChange}
          {...this.props}
        />
      </div>
    );
  }
}

UserMailAutoCompleteSelectContainer.propTypes = {
  error: PropTypes.object,
  users: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  loadUserMailAutoCompletes: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  users: makeSelectUserMailAutoCompletes(),
  loading: makeSelectUserMailAutoCompletesLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadUserMailAutoCompletes: (params) =>
    dispatch(loadUserMailAutoCompletes(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });
export default compose(withReducer, withSaga, withConnect)(UserMailAutoCompleteSelectContainer);
