/**
 *
 * FillKpiReport Form Page
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FillKpiReportForm from '../../components/FillKpiReportForm';
import {
  makeSelectError,
  makeSelectFillKpiReportLoading,
  makeSelectSuccess,
} from './selectors';
import { createFillKpiReport, editFillKpiReport } from './actions';
import openNotificationWithIcon from '../../utils/antd-notification';

class FillKpiReportFormContainer extends Component {
  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error && prevProps.error !== error) {
      openNotificationWithIcon('error', error.toString());
    }
  }
  handleCancel = () => {
    this.props.onCancel();
  };

  handleSubmit = (fillKpiReportValues) =>
    this.props.editFillKpiReport(fillKpiReportValues);

  render() {
    const { handleSubmit, handleCancel } = this;
    const { error, success, ...restProps } = this.props;

    return (
      <FillKpiReportForm
        {...restProps}
        success={success}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
}

FillKpiReportFormContainer.propTypes = {
  editFillKpiReport: PropTypes.func.isRequired,
  createFillKpiReport: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.object,
  fillKpiReport: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectFillKpiReportLoading(),
  success: makeSelectSuccess(),
});

const mapDispatchToProps = (dispatch) => ({
  editFillKpiReport: (fillKpiReport) =>
    dispatch(editFillKpiReport(fillKpiReport)),
  createFillKpiReport: (fillKpiReport) =>
    dispatch(createFillKpiReport(fillKpiReport)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect)(FillKpiReportFormContainer);
