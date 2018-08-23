/**
 *
 * Grouping Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';

import GroupingForm from '../../components/GroupingForm';

import {
  makeSelectError,
  makeSelectGroupingLoading,
  makeSelectSuccess,
} from './selectors';
import { createGrouping, editGrouping } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { loadBranches } from '../BranchListContainer/actions';

class GroupingFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
    if (success && prevProps.success !== success) {
      openNotificationWithIcon('success', success.message);
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };
  handleSubmit = (groupingValues) => {
    const { grouping } = this.props;
    if (grouping.id) {
      return this.props.editGrouping(groupingValues);
    }
    return this.props
      .createGrouping(groupingValues)
      .then(() => this.props.loadBranches());
  };
  render() {
    const { handleSubmit, handleCancel } = this;
    const { error, success, ...restProps } = this.props;
    return (
      <GroupingForm
        {...restProps}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

GroupingFormContainer.propTypes = {
  editGrouping: PropTypes.func.isRequired,
  createGrouping: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  error: PropTypes.object,
  success: PropTypes.object,
  grouping: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    parentMeter: PropTypes.shape({
      id: PropTypes.number,
      className: PropTypes.string,
    }),
  }),
  loadBranches: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectGroupingLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editGrouping: (grouping) => dispatch(editGrouping(grouping)),
  createGrouping: (grouping) =>
    new Promise((resolve) => dispatch(createGrouping(grouping, resolve))),
  loadBranches: () => dispatch(loadBranches()),
});
const withReducer = injectReducer({
  key: 'groupingForm',
  reducer,
});
const withSaga = injectSaga({
  key: 'groupingForm',
  saga,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withReducer, withSaga, withConnect)(GroupingFormContainer);
