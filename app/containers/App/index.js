import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import LoginPage from '../LoginPage/loadable';
import ConsumptionPage from '../ConsumptionPage/loadable';
import MeterPage from '../MeterPage/loadable';
import PowerDemandPage from '../PowerDemandPage/loadable';
import ApportionmentPage from '../ApportionmentPage/loadable';
import BranchPage from '../BranchPage/loadable';
import BranchDetailsPage from '../BranchDetailsPage/loadable';
import ProductiveHoursPage from '../ProductiveHoursPage/loadable';
import RushHoursPage from '../RushHoursPage/loadable';
import MyUsersPage from '../UsersPage/loadable';

import PrivateDefaultLayout from '../../layouts/PrivateDefaultLayout';
import AdminDefaultLayout from '../../layouts/AdminDefaultLayout';
import './fileLoads';
import './style.less';
import injectSaga from '../../utils/injectSaga';
import loginSaga from '../LoginPage/saga';
import loginReducer from '../LoginPage/reducer';
import meterTreeFilerReducer from '../MetersTreeFilter/reducer';
import meterTreeFilerSaga from '../MetersTreeFilter/saga';
import GenericNotFound from '../../components/GenericNotFound';
import injectReducer from '../../utils/injectReducer';
import WorkingHours from '../../components/WorkingHours/index';
import forgetPasswordReducer from '../ForgetPasswordModalContainer/reducer';
import forgetPasswordSaga from '../ForgetPasswordModalContainer/saga';
import ReportPage from '../ReportPage/loadable';
import AlertPage from '../AlertPage/index';
import MyPerformanceIndexPage from '../MyPerformanceIndexPage/loadable';
import currentEggWorkingHoursSaga from '../WorkingHours/CurrentEggWorkingHoursContainer/saga';
import currentEggWorkingHoursReducer from '../WorkingHours/CurrentEggWorkingHoursContainer/reducer';
import currentBranchWorkingHoursReducer from '../WorkingHours/CurrentBranchWorkingHoursContainer/reducer';
import currentBranchWorkingHoursSaga from '../WorkingHours/CurrentBranchWorkingHoursContainer/saga';
import branchWorkingHoursSaga from '../WorkingHours/BranchWorkingHoursContainer/saga';
import branchPaginatedWorkingHoursContainerReducer from '../WorkingHours/BranchWorkingHoursContainer/reducer';
import eggWorkingHoursSaga from '../WorkingHours/EggWorkingHoursContainer/saga';
import eggPaginatedWorkingHoursContainerReducer from '../WorkingHours/EggWorkingHoursContainer/reducer';
import workingHoursFormContainerReducer from '../WorkingHours/WorkingHoursFormContainer/reducer';
import workingHoursFormContainerSaga from '../WorkingHours/WorkingHoursFormContainer/saga';
import deleteWorkingHoursSaga from '../WorkingHours/DeleteWorkingHoursContainer/saga';
import deleteWorkingHoursReducer from '../WorkingHours/DeleteWorkingHoursContainer/reducer';
import companyListSaga from '../CompanyListContainer/saga';
import companyListReducer from '../CompanyListContainer/reducer';

import CompanyPage from '../CompanyPage/loadable';
import DashboardPage from '../DashboardPage/loadable';
import {
  ADMIN_ROLE,
  ALERTS_URL,
  BRANCHES_URL,
  METERS_URL,
  PERFORMANCE_INDEX_URL,
  USER_ROLE,
  USERS_URL,
} from '../../utils/constants';

const App = () => (
  <Switch>
    <PrivateDefaultLayout exact path="/timesheet" component={WorkingHours} />
    <PrivateDefaultLayout exact path="/" component={DashboardPage} />
    <PrivateDefaultLayout exact path="/rateio" component={ApportionmentPage} />
    <PrivateDefaultLayout exact path="/consumo" component={ConsumptionPage} />
    <PrivateDefaultLayout exact path="/demanda" component={PowerDemandPage} />
    <PrivateDefaultLayout path={`/${METERS_URL}`} component={MeterPage} />
    <PrivateDefaultLayout
      exact
      path="/horario-produtivo"
      component={ProductiveHoursPage}
    />{' '}
    <PrivateDefaultLayout
      exact
      path="/horario-ponta"
      component={RushHoursPage}
    />
    <PrivateDefaultLayout
      exact
      path={`/${BRANCHES_URL}`}
      component={BranchPage}
    />
    <PrivateDefaultLayout
      path={`/${BRANCHES_URL}/:id`}
      component={BranchDetailsPage}
    />
    <PrivateDefaultLayout exact path="/exportacao" component={ReportPage} />
    <AdminDefaultLayout path={`/${USERS_URL}/`} component={MyUsersPage} />
    <Route exact path="/login" component={LoginPage} />
    <PrivateDefaultLayout path={`/${ALERTS_URL}`} component={AlertPage} />
    <PrivateDefaultLayout
      path={`/${PERFORMANCE_INDEX_URL}`}
      component={MyPerformanceIndexPage}
    />
    <PrivateDefaultLayout
      exact
      path="/empresas"
      component={CompanyPage}
      notAllowedRoles={[USER_ROLE, ADMIN_ROLE]}
    />
    <PrivateDefaultLayout exact path="/dashboard" component={DashboardPage} />
    <Route component={GenericNotFound} />
  </Switch>
);

const withLoginSaga = injectSaga({
  key: 'login',
  saga: loginSaga,
});
const withLoginReducer = injectReducer({
  key: 'login',
  reducer: loginReducer,
});
const withMeterTreeFilterReducer = injectReducer({
  key: 'metersTreeFilter',
  reducer: meterTreeFilerReducer,
});
const withMeterTreeFilterSaga = injectSaga({
  key: 'metersTreeFilter',
  saga: meterTreeFilerSaga,
});
const withForgetPasswordReducer = injectReducer({
  key: 'forgetPassword',
  reducer: forgetPasswordReducer,
});
const withForgetPassewordSaga = injectSaga({
  key: 'forgetPassword',
  saga: forgetPasswordSaga,
});

const withEggWorkingHoursReducer = injectReducer({
  key: 'eggWorkingHours',
  reducer: eggPaginatedWorkingHoursContainerReducer,
});

const withEggWorkingHoursSaga = injectSaga({
  key: 'eggWorkingHours',
  saga: eggWorkingHoursSaga,
});

const withCurrentEggWorkingHoursReducer = injectReducer({
  key: 'currentEggWorkingHours',
  reducer: currentEggWorkingHoursReducer,
});
const withCurrentEggWorkingHoursSaga = injectSaga({
  key: 'currentEggWorkingHours',
  saga: currentEggWorkingHoursSaga,
});

const withBranchWorkingHoursReducer = injectReducer({
  key: 'branchWorkingHours',
  reducer: branchPaginatedWorkingHoursContainerReducer,
});

const withBranchWorkingHoursSaga = injectSaga({
  key: 'branchWorkingHours',
  saga: branchWorkingHoursSaga,
});

const withCurrentBranchWorkingHoursReducer = injectReducer({
  key: 'currentBranchWorkingHours',
  reducer: currentBranchWorkingHoursReducer,
});
const withCurrentBranchWorkingHoursSaga = injectSaga({
  key: 'currentBranchWorkingHours',
  saga: currentBranchWorkingHoursSaga,
});

const withWorkingHoursFormContainerReducer = injectReducer({
  key: 'workingHoursForm',
  reducer: workingHoursFormContainerReducer,
});
const withWorkingHoursFormContainerSaga = injectSaga({
  key: 'workingHoursForm',
  saga: workingHoursFormContainerSaga,
});

const withDeleteWorkingHoursReducer = injectReducer({
  key: 'deleteWorkingHours',
  reducer: deleteWorkingHoursReducer,
});
const withDeleteWorkingHourSaga = injectSaga({
  key: 'deleteWorkingHours',
  saga: deleteWorkingHoursSaga,
});

const withMeterTreeFilterCompaniesSaga = injectSaga({
  key: 'meterTreeFilterCompanies',
  saga: companyListSaga,
});

const withMeterTreeFilterCompaniesReducer = injectReducer({
  key: 'meterTreeFilterCompanies',
  reducer: companyListReducer,
});

export default compose(
  withLoginSaga,
  withLoginReducer,
  withForgetPasswordReducer,
  withForgetPassewordSaga,
  withMeterTreeFilterReducer,
  withMeterTreeFilterSaga,
  withCurrentEggWorkingHoursReducer,
  withCurrentEggWorkingHoursSaga,
  withEggWorkingHoursReducer,
  withEggWorkingHoursSaga,
  withBranchWorkingHoursReducer,
  withBranchWorkingHoursSaga,
  withCurrentBranchWorkingHoursReducer,
  withCurrentBranchWorkingHoursSaga,
  withWorkingHoursFormContainerReducer,
  withWorkingHoursFormContainerSaga,
  withDeleteWorkingHoursReducer,
  withDeleteWorkingHourSaga,
  withMeterTreeFilterCompaniesSaga,
  withMeterTreeFilterCompaniesReducer
)(App);
