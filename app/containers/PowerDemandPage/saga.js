import { takeLatest, call, put } from 'redux-saga/effects';
import { getRequest } from '../../utils/request';
import { LOAD_POWER_DEMAND } from './constants';
import { loadPowerDemandPagesError, powerDemandPagesLoaded } from './actions';
import { API_URL } from '../../utils/constants';
import { formatToMeterSelectionFilter } from '../../utils/formatToMeterSelectionFilter';

const formatPowerDemandDataToReducer = ({
  branchesPower,
  groupingsPower,
  eggsPower,
  summary,
}) => ({
  meters: [...branchesPower, ...groupingsPower, ...eggsPower],
  summary,
});

export default function* powerDemandPagesData() {
  yield takeLatest(LOAD_POWER_DEMAND, getAllPowerDemandPages);
}

export function* getAllPowerDemandPages({ params }) {
  try {
    const powerDemands = yield call(
      getRequest,
      `${API_URL}/power`,
      formatToMeterSelectionFilter(params)
    );
    yield put(powerDemandPagesLoaded(formatPowerDemandDataToReducer(powerDemands.data)));
  } catch (error) {
    yield put(loadPowerDemandPagesError(error));
  }
}
