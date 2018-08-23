import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import moment from 'moment';
import { getRequest } from '../../utils/request';
import { LOAD_CURRENT_FARES_BY_BRANCH } from './constants';
import {
  loadCurrentFaresByBranchError,
  currentFaresByBranchLoaded,
  loadCurrentFaresByBranch,
} from './actions';
import { API_URL } from '../../utils/constants';
import {
  CREATE_CONSUMPTION_FARE_SUCCESS,
  EDIT_CONSUMPTION_FARE_SUCCESS,
  REMOVE_CONSUMPTION_FARE_SUCCESS,
} from '../ConsumptionFareFormContainer/constants';
import { makeSelectBranchDetails } from '../BranchDetailsPage/selectors';
import openNotificationWithIcon from '../../utils/antd-notification';
import {
  CREATE_DEMAND_FARE_SUCCESS,
  EDIT_DEMAND_FARE_SUCCESS,
  REMOVE_DEMAND_FARE_SUCCESS,
} from '../DemandFareFormContainer/constants';
import {
  CREATE_DEMAND_EXCEED_FARE_SUCCESS,
  EDIT_DEMAND_EXCEED_FARE_SUCCESS,
  REMOVE_DEMAND_EXCEED_FARE_SUCCESS,
} from '../DemandExceedFareFormContainer/constants';
import { EDIT_DISABLE_DEMAND_FARE_SUCCESS } from '../DisableDemandFareFormContainer/constants';
import { EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS } from '../DisableDemandExceedFareFormContainer/constants';

export default function* faresData() {
  yield all([
    takeLatest(LOAD_CURRENT_FARES_BY_BRANCH, getAllFares),

    takeLatest(CREATE_CONSUMPTION_FARE_SUCCESS, reloadAllFares),
    takeLatest(EDIT_CONSUMPTION_FARE_SUCCESS, reloadAllFares),
    takeLatest(REMOVE_CONSUMPTION_FARE_SUCCESS, reloadAllFares),

    takeLatest(CREATE_DEMAND_FARE_SUCCESS, reloadAllFares),
    takeLatest(EDIT_DEMAND_FARE_SUCCESS, reloadAllFares),
    takeLatest(REMOVE_DEMAND_FARE_SUCCESS, reloadAllFares),
    takeLatest(EDIT_DISABLE_DEMAND_FARE_SUCCESS, reloadAllFares),

    takeLatest(CREATE_DEMAND_EXCEED_FARE_SUCCESS, reloadAllFares),
    takeLatest(EDIT_DEMAND_EXCEED_FARE_SUCCESS, reloadAllFares),
    takeLatest(REMOVE_DEMAND_EXCEED_FARE_SUCCESS, reloadAllFares),
    takeLatest(EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS, reloadAllFares),
  ]);
}

export function* reloadAllFares() {
  try {
    const { id } = yield select(makeSelectBranchDetails());
    yield put(loadCurrentFaresByBranch(id));
  } catch (error) {
    openNotificationWithIcon('error', error);
  }
}

export function* getAllFares({ branchId, currentDate }) {
  try {
    const queryStringObject = { searchActiveDate: currentDate };

    const fares = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/fare`,
      queryStringObject
    );

    const newCurrentFares = Object.keys(fares.data).reduce((prev, current) => {
      const { startDate, endDate, ...restProps } = fares.data[current];
      return {
        ...prev,
        [current]: {
          ...restProps,
          startDate: moment(startDate, 'YYYY-MM-DD'),
          endDate: moment(endDate, 'YYYY-MM-DD'),
        },
      };
    }, {});
    yield put(currentFaresByBranchLoaded(newCurrentFares));
  } catch (error) {
    yield put(loadCurrentFaresByBranchError(error));
  }
}
