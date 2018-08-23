import {
  takeLatest,
  take,
  call,
  put,
  race,
  all,
  cancelled,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { fromJS } from 'immutable';
import { getRequest } from '../../utils/request';
import {
  LOAD_DASHBOARD,
  LOAD_DASHBOARD_REAL_TIME,
  STOP_DASHBOARD_REAL_TIME,
} from './constants';
import {
  loadDashboardError,
  dashboardLoaded,
  dashboardDemandPowerLoaded,
  dashboardDemandPowerError,
  dashboardRealTimeDisconnected,
} from './actions';
import { API_URL } from '../../utils/constants';
import { createSocketConnection } from '../../utils/socketConnection';

export default function* dashboardData() {
  yield all([
    startOrStopDashboardChannel(),
    takeLatest(LOAD_DASHBOARD, getAllDashboard),
  ]);
}

export function* getAllDashboard({ params: { branchId, ...restParams } }) {
  try {
    const response = yield call(
      getRequest,
      `${API_URL}/branch/${branchId}/dashboard`,
      restParams
    );
    const { total: totalCount, limit } = response.data;
    let dashboard = response.data ? response.data : {};
    dashboard = fromJS(dashboard);
    yield put(dashboardLoaded(dashboard, totalCount, limit));
  } catch (error) {
    yield put(loadDashboardError(error));
  }
}

function createSocketChannel(socket, eventName) {
  return eventChannel((emit) => {
    const eventHandle = (payload) => emit(payload);
    socket.on(eventName, eventHandle);
    return () => socket.off(eventName, eventHandle);
  });
}

export function* startOrStopDashboardChannel() {
  while (true) {
    const { params } = yield take(LOAD_DASHBOARD_REAL_TIME);
    yield race({
      task: call(listenDashboardChannel, params),
      cancel: take(STOP_DASHBOARD_REAL_TIME),
    });
  }
}

export function* listenDashboardChannel(params) {
  let socket;
  try {
    socket = yield call(createSocketConnection, '/dashboard', {
      query: params,
    });
    const socketChannel = yield call(
      createSocketChannel,
      socket,
      'listDashboard'
    );
    while (true) {
      const dashboard = yield take(socketChannel);
      yield put(dashboardDemandPowerLoaded(dashboard));
    }
  } catch (error) {
    yield put(dashboardDemandPowerError(error));
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put(dashboardRealTimeDisconnected());
    }
  }
}
