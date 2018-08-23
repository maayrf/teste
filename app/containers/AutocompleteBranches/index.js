/**
 *
 * Autocomplete Branches Page
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
  makeSelectListBranches,
  makeSelectAutocompleteBranchessLoading,
} from './selectors';
import { loadAutocompleteBranches } from './actions';
import reducer from './reducer';
import saga from './saga';
import SelectBranchesTags from '../../components/SelectBranchesTags/index';
import './style.less';
import openNotificationWithIcon from '../../utils/antd-notification';

class AutocompleteBranches extends Component {
  state = {
    currentValue: '',
  };
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.message.toString());
    }
  }
  handleChange = (currentValue) => {
    this.setState({
      currentValue,
    });
  };
  fetchBranches = (textValue) => {
    if (textValue.length) {
      this.props.loadAutocompleteBranches({
        ...this.props.filter,
        searchTextValue: textValue,
      });
    }
  };
  render() {
    const { listBranches, ...restProps } = this.props;
    const { currentValue } = this.state;
    return (
      <SelectBranchesTags
        branches={listBranches}
        currentValue={currentValue}
        onChange={this.handleChange}
        fetchBranches={this.fetchBranches}
        {...restProps}
      />
    );
  }
}

AutocompleteBranches.propTypes = {
  error: PropTypes.object,
  filter: PropTypes.object,
  listBranches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadAutocompleteBranches: PropTypes.func.isRequired,
  myBranchesIds: PropTypes.array,
};
AutocompleteBranches.defaultProps = {
  filter: {},
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  listBranches: makeSelectListBranches(),
  loading: makeSelectAutocompleteBranchessLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadAutocompleteBranches: (params) =>
    dispatch(loadAutocompleteBranches(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'autocompleteBranches', reducer });
const withSaga = injectSaga({ key: 'autocompleteBranches', saga });
export default compose(withReducer, withSaga, withConnect)(AutocompleteBranches);
