/**
 *
 * Alerts Emitted Page
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
  makeSelectFinancialCostByRangeSummary,
  makeSelectFinancialCostByRangeSummaryLoading,
} from './selectors';
import { loadFinancialCostByRangeSummary } from './actions';
import reducer from './reducer';
import saga from './saga';
import openNotificationWithIcon from '../../utils/antd-notification';
import DateRangeSummary from '../../components/DateRangeSummary';

class FinancialCostByRangeSummaryContainer extends Component {
  componentDidMount() {
    if (
      this.props.value &&
      this.props.value.rangeDate &&
      this.props.value.rangeDate.length
    ) {
      const [startDate, endDate] = this.props.value.rangeDate;
      this.loadFinancialCostByRangeSummary(startDate, endDate);
    }
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
  }

  onRangeDateChange = ([startDate, endDate]) => {
    this.loadFinancialCostByRangeSummary(startDate, endDate);
  };
  loadFinancialCostByRangeSummary = (startDate, endDate) => {
    const { meters } = this.props;
    this.props.loadFinancialCostByRangeSummary({
      startDate,
      endDate,
      meters: meters.map(({ className, id }) => ({ className, id })),
    });
  };

  render() {
    const { loadingSummary, financialCostByRangeSummary } = this.props;

    return (
      <div className="financial-cost-by-range-summary">
        <DateRangeSummary
          {...this.props}
          loadingSummary={loadingSummary}
          dateRangeSummary={financialCostByRangeSummary}
          onRangeDateChange={this.onRangeDateChange}
        />
      </div>
    );
  }
}

FinancialCostByRangeSummaryContainer.propTypes = {
  alertType: PropTypes.string.isRequired,
  analysisInterval: PropTypes.string,
  meters: PropTypes.array,
  error: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.object,
  financialCostByRangeSummary: PropTypes.object.isRequired,
  loadingSummary: PropTypes.bool,
  loadFinancialCostByRangeSummary: PropTypes.func.isRequired,
};

FinancialCostByRangeSummaryContainer.defaultProps = {
  meters: [],
  onChange: () => {},
  loadingSummary: false,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  financialCostByRangeSummary: makeSelectFinancialCostByRangeSummary(),
  loadingSummary: makeSelectFinancialCostByRangeSummaryLoading(),
});

const mapDispatchToProps = (dispatch) => ({
  loadFinancialCostByRangeSummary: (params) =>
    dispatch(loadFinancialCostByRangeSummary(params)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({
  key: 'financialCostByRangeSummary',
  reducer,
});
const withSaga = injectSaga({ key: 'financialCostByRangeSummary', saga });
export default compose(withReducer, withSaga, withConnect)(FinancialCostByRangeSummaryContainer);
