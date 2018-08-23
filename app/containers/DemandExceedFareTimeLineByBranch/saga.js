import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_DEMAND_EXCEED_FARES_BY_BRANCH } from './constants';
import {
  demandExceedFaresByBranchIdError,
  demandExceedFaresByBranchIdLoaded,
  loadDemandExceedFaresByBranchId,
} from './actions';
import { normalizeDemandExceedFares } from './normalizr';
import { API_URL } from '../../utils/constants';
import { makeSelectBranchDetails } from '../BranchDetailsPage/selectors';
import {
  CREATE_DEMAND_EXCEED_FARE_SUCCESS,
  EDIT_DEMAND_EXCEED_FARE_SUCCESS,
  REMOVE_DEMAND_EXCEED_FARE_SUCCESS,
} from '../DemandExceedFareFormContainer/constants';
import { EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS } from '../DisableDemandExceedFareFormContainer/constants';
import { formatDateInterval } from '../../utils/formatDatesInterval';

export default function* demandExceedFaresTimeLineByBranchData() {
  yield all([
    takeLatest(
      LOAD_DEMAND_EXCEED_FARES_BY_BRANCH,
      getAllDemandExceedFaresByBranch
    ),
    takeLatest(
      CREATE_DEMAND_EXCEED_FARE_SUCCESS,
      reloadDemandExceedFaresByBranch
    ),
    takeLatest(
      REMOVE_DEMAND_EXCEED_FARE_SUCCESS,
      reloadDemandExceedFaresByBranch
    ),
    takeLatest(
      EDIT_DEMAND_EXCEED_FARE_SUCCESS,
      reloadDemandExceedFaresByBranch
    ),
    takeLatest(
      EDIT_DISABLE_DEMAND_EXCEED_FARE_SUCCESS,
      reloadDemandExceedFaresByBranch
    ),
  ]);
}

export function* reloadDemandExceedFaresByBranch() {
  const { id } = yield select(makeSelectBranchDetails());
  yield put(loadDemandExceedFaresByBranchId(id, {
    paginationStart: 0,
    paginationNumber: 15,
  }));
}

export function* getAllDemandExceedFaresByBranch({ branchId, params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/demandExceedingFare`,
      params
    );

    const demandExceedFares = formatDateInterval(response.data.items);

    const { limit, offset, filtered: totalCount } = response.data;

    yield put(demandExceedFaresByBranchIdLoaded(
      demandExceedFares,
      totalCount,
      limit,
      offset
    ));
  } catch (error) {
    yield put(demandExceedFaresByBranchIdError(error));
  }
}
