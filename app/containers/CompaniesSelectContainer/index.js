/**
 *
 * Companies Mail Auto Complete Container
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
  makeSelectCompanies,
  makeSelectCompaniesLoading,
  makeSelectLimit,
  makeSelectTotalCount,
} from './selectors';
import { loadCompanies } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import CompaniesSelect from '../../components/CompaniesSelect';

class CompaniesSelectContainer extends Component {
  static defaultProps = {
    onChange: () => {},
    style: { width: '100%' },
    value: null,
    filter: {},
  };
  componentDidMount() {
    const { filter } = this.props;
    this.props.loadCompanies(filter);
  }
  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }

  render() {
    return <CompaniesSelect {...this.props} />;
  }
}

CompaniesSelectContainer.propTypes = {
  filter: PropTypes.object,
  style: PropTypes.object,
  error: PropTypes.object,
  companies: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loading: PropTypes.bool.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  limit: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  companies: makeSelectCompanies(),
  loading: makeSelectCompaniesLoading(),
  limit: makeSelectLimit(),
  totalCount: makeSelectTotalCount(),
});

const mapDispatchToProps = (dispatch) => ({
  loadCompanies: (params) => dispatch(loadCompanies(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'companiesSelect', reducer });
const withSaga = injectSaga({ key: 'companiesSelect', saga });
export default compose(withReducer, withSaga, withConnect)(CompaniesSelectContainer);
