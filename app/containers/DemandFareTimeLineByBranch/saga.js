import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_DEMAND_FARES_BY_BRANCH } from './constants';
import {
  demandFaresByBranchIdError,
  demandFaresByBranchIdLoaded,
  loadDemandFaresByBranchId,
} from './actions';
import { normalizeDemandFaresByBranch } from './normalizr';
import { API_URL } from '../../utils/constants';
import { makeSelectBranchDetails } from '../BranchDetailsPage/selectors';
import {
  CREATE_DEMAND_FARE_SUCCESS,
  EDIT_DEMAND_FARE_SUCCESS,
  REMOVE_DEMAND_FARE_SUCCESS,
} from '../DemandFareFormContainer/constants';
import { EDIT_DISABLE_DEMAND_FARE_SUCCESS } from '../DisableDemandFareFormContainer/constants';
import { formatDateInterval } from '../../utils/formatDatesInterval';

export default function* demandFaresTimeLineByBranchData() {
  yield all([
    takeLatest(LOAD_DEMAND_FARES_BY_BRANCH, getAllDemandFaresByBranch),
    takeLatest(CREATE_DEMAND_FARE_SUCCESS, reloadDemandFaresByBranch),
    takeLatest(REMOVE_DEMAND_FARE_SUCCESS, reloadDemandFaresByBranch),
    takeLatest(EDIT_DEMAND_FARE_SUCCESS, reloadDemandFaresByBranch),
    takeLatest(EDIT_DISABLE_DEMAND_FARE_SUCCESS, reloadDemandFaresByBranch),
  ]);
}

export function* reloadDemandFaresByBranch() {
  const { id } = yield select(makeSelectBranchDetails());
  yield put(loadDemandFaresByBranchId(id, {
    paginationStart: 0,
    paginationNumber: 15,
  }));
}

export function* getAllDemandFaresByBranch({ branchId, params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/demandFare`,
      params
    );
    const demandFares = formatDateInterval(response.data.items);

    const { limit, offset, filtered: totalCount } = response.data;

    yield put(demandFaresByBranchIdLoaded(demandFares, totalCount, limit, offset));
  } catch (error) {
    yield put(demandFaresByBranchIdError(error));
  }
}
