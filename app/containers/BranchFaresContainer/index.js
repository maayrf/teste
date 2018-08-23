/**
 *
 * Fare Page
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
  makeSelectConsumptionFare,
  makeSelectDemandExceedFare,
  makeSelectDemandFare,
  makeSelectError,
  makeSelectFaresLoading,
} from './selectors';
import { loadCurrentFaresByBranch } from './actions';
import consumptionFareFormReducer from '../ConsumptionFareFormContainer/reducer';
import consumptionFareFormSaga from '../ConsumptionFareFormContainer/saga';
import demandExceedFareFormReducer from '../DemandExceedFareFormContainer/reducer';
import demandExceedFareFormSaga from '../DemandExceedFareFormContainer/saga';
import demandFareFormReducer from '../DemandFareFormContainer/reducer';
import demandFareFormSaga from '../DemandFareFormContainer/saga';
import demandFareReducer from '../DemandFareDetailHOC/reducer';
import demandFareSaga from '../DemandFareDetailHOC/saga';
import consumptionFareReducer from '../ConsumptionFareDetailHOC/reducer';
import consumptionFareSaga from '../ConsumptionFareDetailHOC/saga';
import demandExceedFareReducer from '../DemandExceedFareDetailHOC/reducer';
import demandExceedFareSaga from '../DemandExceedFareDetailHOC/saga';
import reducer from './reducer';
import saga from './saga';

import LoadingCard from '../../components/LoadingCard/index';
import BranchFares from '../../components/BranchFares/index';
import FareTabs from '../FareTabs/index';
import openNotificationWithIcon from '../../utils/antd-notification';
import disableDemandExceedFareFormReducer from '../DisableDemandExceedFareFormContainer/reducer';
import disableDemandExceedFareSaga from '../DisableDemandExceedFareFormContainer/saga';
import disableDemandFareFormReducer from '../DisableDemandFareFormContainer/reducer';
import disableDemandFareSaga from '../DisableDemandFareFormContainer/saga';

class BranchFaresContainer extends Component {
  componentDidMount() {
    const { branchId } = this.props;
    this.props.loadCurrentFaresByBranch(branchId);
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      openNotificationWithIcon('error', error.toString());
    }
  }

  render() {
    const {
      branchId,
      loading,
      consumptionFare,
      demandFare,
      demandExceedFare,
    } = this.props;
    return (
      <div className="fare-page">
        <LoadingCard loading={loading} className="_margin-bottom">
          <BranchFares
            branchId={branchId}
            consumptionFare={consumptionFare}
            demandFare={demandFare}
            demandExceedFare={demandExceedFare}
          />
        </LoadingCard>
        <FareTabs branchId={branchId} />
      </div>
    );
  }
}

BranchFaresContainer.propTypes = {
  branchId: PropTypes.number.isRequired,
  error: PropTypes.object,
  consumptionFare: PropTypes.object,
  demandFare: PropTypes.object,
  demandExceedFare: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  loadCurrentFaresByBranch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectFaresLoading(),
  consumptionFare: makeSelectConsumptionFare(),
  demandFare: makeSelectDemandFare(),
  demandExceedFare: makeSelectDemandExceedFare(),
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrentFaresByBranch: (branchId) =>
    dispatch(loadCurrentFaresByBranch(branchId)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'branchFares', reducer });
const withSaga = injectSaga({ key: 'branchFares', saga });
const withConsumptionFormReducer = injectReducer({
  key: 'consumptionFareForm',
  reducer: consumptionFareFormReducer,
});
const withConsumptionFormSaga = injectSaga({
  key: 'consumptionFareForm',
  saga: consumptionFareFormSaga,
});
const withDemandExceedFormReducer = injectReducer({
  key: 'demandExceedFareForm',
  reducer: demandExceedFareFormReducer,
});
const withDemandExceedFormSaga = injectSaga({
  key: 'demandExceedFareForm',
  saga: demandExceedFareFormSaga,
});
const withDemandFormReducer = injectReducer({
  key: 'demandFareForm',
  reducer: demandFareFormReducer,
});
const withDemandFormSaga = injectSaga({
  key: 'demandFareForm',
  saga: demandFareFormSaga,
});
const withDemandFareReducer = injectReducer({
  key: 'demandFare',
  reducer: demandFareReducer,
});
const withDemandFareSaga = injectSaga({
  key: 'demandFare',
  saga: demandFareSaga,
});

const withConsumptionFareReducer = injectReducer({
  key: 'consumptionFare',
  reducer: consumptionFareReducer,
});
const withConsumptionFareSaga = injectSaga({
  key: 'consumptionFare',
  saga: consumptionFareSaga,
});
const withDemandExceedFareReducer = injectReducer({
  key: 'demandExceedFare',
  reducer: demandExceedFareReducer,
});
const withDemandExceedFareSaga = injectSaga({
  key: 'demandExceedFare',
  saga: demandExceedFareSaga,
});
const withDisableDemandExceedFareReducer = injectReducer({
  key: 'disableDemandExceedFareForm',
  reducer: disableDemandExceedFareFormReducer,
});
const withDisableDemandExceedFareSaga = injectSaga({
  key: 'disableDemandExceedFareForm',
  saga: disableDemandExceedFareSaga,
});
const withDisableDemandFareReducer = injectReducer({
  key: 'disableDemandFareForm',
  reducer: disableDemandFareFormReducer,
});
const withDisableDemandFareSaga = injectSaga({
  key: 'disableDemandFareForm',
  saga: disableDemandFareSaga,
});

export default compose(
  withReducer,
  withSaga,
  withDemandExceedFareReducer,
  withDemandExceedFareSaga,
  withConsumptionFormReducer,
  withConsumptionFormSaga,
  withConsumptionFareReducer,
  withConsumptionFareSaga,
  withDemandFareReducer,
  withDemandFareSaga,
  withDemandExceedFormReducer,
  withDemandExceedFormSaga,
  withDemandFormReducer,
  withDemandFormSaga,
  withDisableDemandExceedFareReducer,
  withDisableDemandExceedFareSaga,
  withDisableDemandFareReducer,
  withDisableDemandFareSaga,
  withConnect
)(BranchFaresContainer);
