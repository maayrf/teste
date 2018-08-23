import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { getRequest } from '../../../utils/request';
import { LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS } from './constants';
import {
  loadPaginatedInfoOfEggWorkingHoursError,
  paginatedInfoOfEggWorkingHoursLoaded,
} from './actions';
import { API_URL } from '../../../utils/constants';
import { formatDateInterval } from '../../../utils/formatDatesInterval';

export default function* eggPaginatedWorkingHoursData() {
  yield all([
    takeLatest(
      LOAD_PAGINATED_INFO_OF_EGG_WORKING_HOURS,
      getEggPaginatedWorkingHours
    ),
  ]);
}

function* getEggPaginatedWorkingHours({ eggId, params }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/egg/${eggId}/workingHour`,
      params
    );
    const {
      total, limit, offset, filtered: totalCount,
    } = response.data;
    const workinHours = formatDateInterval(response.data.items);

    yield put(paginatedInfoOfEggWorkingHoursLoaded(
      workinHours,
      totalCount,
      limit,
      offset
    ));
  } catch (error) {
    yield put(loadPaginatedInfoOfEggWorkingHoursError(error));
  }
}
