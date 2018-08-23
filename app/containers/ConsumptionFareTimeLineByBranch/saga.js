import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_CONSUMPTION_FARES_BY_BRANCH } from './constants';
import {
  consumptionFaresByBranchIdError,
  consumptionFaresByBranchIdLoaded,
  loadConsumptionFaresByBranchId,
} from './actions';
import { normalizeConsumptionFares } from './normalizr';
import { API_URL } from '../../utils/constants';
import {
  CREATE_CONSUMPTION_FARE_SUCCESS,
  EDIT_CONSUMPTION_FARE_SUCCESS,
  REMOVE_CONSUMPTION_FARE_SUCCESS,
} from '../ConsumptionFareFormContainer/constants';
import { makeSelectBranchDetails } from '../BranchDetailsPage/selectors';
import { formatDateInterval } from '../../utils/formatDatesInterval';

export default function* consumptionFaresByBranchData() {
  yield all([
    takeLatest(
      LOAD_CONSUMPTION_FARES_BY_BRANCH,
      getAllConsumptionFaresByBranch
    ),
    takeLatest(CREATE_CONSUMPTION_FARE_SUCCESS, reloadConsumptionFaresByBranch),
    takeLatest(REMOVE_CONSUMPTION_FARE_SUCCESS, reloadConsumptionFaresByBranch),
    takeLatest(EDIT_CONSUMPTION_FARE_SUCCESS, reloadConsumptionFaresByBranch),
  ]);
}

export function* reloadConsumptionFaresByBranch() {
  const { id } = yield select(makeSelectBranchDetails());
  yield put(loadConsumptionFaresByBranchId(id, {
    paginationStart: 0,
    paginationNumber: 15,
  }));
}

export function* getAllConsumptionFaresByBranch({ branchId, params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/consumptionFare`,
      params
    );

    const consumptionFares = formatDateInterval(response.data.items);
    const { limit, offset, filtered: totalCount } = response.data;

    yield put(consumptionFaresByBranchIdLoaded(
      consumptionFares,
      totalCount,
      limit,
      offset
    ));
  } catch (error) {
    yield put(consumptionFaresByBranchIdError(error));
  }
}
