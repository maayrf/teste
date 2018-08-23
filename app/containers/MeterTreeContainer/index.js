/**
 *
 * Meter Tree Container
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
  makeSelectMeterTree,
  makeSelectMeterTreesLoading,
} from './selectors';
import { loadMeterTree } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import LoadingCard from '../../components/LoadingCard/index';
import MeterTree from '../../components/MeterTree';

class MeterTreeContainer extends Component {
  componentDidMount() {
    this.loadMeterTree();
  }
  componentDidUpdate(prevProps) {
    const {
      error,
      filter: { searchCompanyId },
    } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.message);
    }
    if (
      prevProps.filter.searchCompanyId !== searchCompanyId &&
      searchCompanyId
    ) {
      this.props.onChange([]);
      this.loadMeterTree();
    }
  }
  loadMeterTree = (filter) => {
    const params = filter || this.props.filter;
    this.props.loadMeterTree(params);
  };
  render() {
    const { loading, ...restProps } = this.props;
    return (
      <div className="meter-tree">
        <LoadingCard loading={loading}>
          <MeterTree {...restProps} />
        </LoadingCard>
      </div>
    );
  }
}

MeterTreeContainer.propTypes = {
  error: PropTypes.object,
  companyId: PropTypes.number,
  meterTree: PropTypes.array.isRequired,
  checkedMeters: PropTypes.array,
  onClickMeter: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  loadMeterTree: PropTypes.func.isRequired,
  filter: PropTypes.object,
  onChange: PropTypes.func,
};
MeterTreeContainer.defaultProps = {
  filter: {},
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  meterTree: makeSelectMeterTree(),
  loading: makeSelectMeterTreesLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadMeterTree: (params) => dispatch(loadMeterTree(params)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'meterTree', reducer });
const withSaga = injectSaga({ key: 'meterTree', saga });
export default compose(
  withReducer,
  withSaga,
  withConnect
)(MeterTreeContainer);
