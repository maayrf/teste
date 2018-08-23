import { take, call, put, all, cancelled, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { fromJS } from 'immutable';
import {
  LOAD_ALERT_NOTIFICATIONS,
  STOP_LOAD_ALERT_NOTIFICATIONS,
} from './constants';
import {
  loadAlertNotificationsError,
  alertNotificationsLoaded,
  alertNotificationDisconnected,
} from './actions';
import { normalizeAlertNotifications } from './normalizr';
import { createSocketConnection } from '../../utils/socketConnection';
import { LOGOUT_USER } from '../LoginPage/constants';

export default function* alertNotificationsData() {
  yield all([startOrStopAlertChannel()]);
}

function createSocketChannel(socket, eventName) {
  return eventChannel((emit) => {
    const eventHandle = (payload) => emit(payload);
    socket.on(eventName, eventHandle);
    return () => socket.off(eventName, eventHandle);
  });
}

export function* startOrStopAlertChannel() {
  while (true) {
    const { params } = yield take(LOAD_ALERT_NOTIFICATIONS);
    yield race({
      task: call(listenAlertChannel, params),
      cancel: all([take(STOP_LOAD_ALERT_NOTIFICATIONS), take(LOGOUT_USER)]),
    });
  }
}

export function* listenAlertChannel(params) {
  let socket;
  try {
    socket = yield call(createSocketConnection, '/alert', {
      query: params,
    });
    const socketChannel = yield call(
      createSocketChannel,
      socket,
      'pendingAlerts'
    );
    while (socketChannel) {
      let alertNotifications = yield take(socketChannel);
      alertNotifications = alertNotifications.length
        ? normalizeAlertNotifications(alertNotifications).entities
          .alertNotifications
        : {};
      alertNotifications = fromJS(alertNotifications);
      yield put(alertNotificationsLoaded(alertNotifications));
    }
  } catch (error) {
    yield put(loadAlertNotificationsError(error));
  } finally {
    if (yield cancelled()) {
      socket.disconnect(true);
      yield put(alertNotificationDisconnected());
    }
  }
}
