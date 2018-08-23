import { takeLatest, call, put } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_CONSUMPTIONS } from './constants';
import {
  loadConsumptionsError,
  consumptionsLoaded,
  consumptionsFareAndWorkingHoursErrorsLoaded,
} from './actions';
import { API_URL } from '../../utils/constants';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';

const formatConsumptionDataToReducer = ({
  branchesConsumption,
  groupingsConsumption,
  eggsConsumption,
  summary,
}) => ({
  meters: [...branchesConsumption, ...groupingsConsumption, ...eggsConsumption],
  summary,
});

export default function* consumptionPagesData() {
  yield takeLatest(LOAD_CONSUMPTIONS, getAllConsumptionPages);
}

export function* getAllConsumptionPages({ params }) {
  try {
    const consumptions = yield call(
      getRequest,
      `${API_URL}/consumption`,
      formatToMeterSelectionFilter(params)
    );
    yield put(consumptionsFareAndWorkingHoursErrorsLoaded(consumptions.errors));
    yield put(consumptionsLoaded(formatConsumptionDataToReducer(consumptions.data)));
  } catch (error) {
    yield put(loadConsumptionsError(error));
  }
}
