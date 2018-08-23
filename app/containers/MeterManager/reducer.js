import { fromJS } from 'immutable';
import {
  REMOVE_METER,
  REMOVE_METER_SUCCESS,
  REMOVE_METER_ERROR,
  CREATE_METER,
  CREATE_METER_SUCCESS,
  CREATE_METER_ERROR,
  EDIT_METER_SUCCESS,
  EDIT_METER,
  EDIT_METER_ERROR,
  LOAD_PENDING_METERS,
  LOAD_PENDING_METERS_SUCCESS,
  LOAD_PENDING_METERS_ERROR,
  MOVE_METER_ERROR,
  MOVE_METER_SUCCESS,
  MOVE_METER,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  pendingMeters: {},
  moveMeterLoading: false,
  moveMeterError: null,
});

function meterReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case MOVE_METER:
      return state.set('moveMeterLoading', true).set('moveMeterError', null);
    case MOVE_METER_SUCCESS:
      return state.set('moveMeterLoading', false);
    case MOVE_METER_ERROR:
      return state
        .set('moveMeterLoading', false)
        .set('moveMeterError', action.error);
    case LOAD_PENDING_METERS:
      return state.set('loading', true).set('error', null);
    case LOAD_PENDING_METERS_SUCCESS:
      return state
        .set('loading', false)
        .set('pendingMeters', action.pendingMeters);
    case LOAD_PENDING_METERS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case REMOVE_METER:
      return state.set('loading', true).set('error', null);
    case REMOVE_METER_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['pendingMeters', action.id.toString()]);
    case REMOVE_METER_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_METER:
      return state.set('loading', true).set('error', null);
    case CREATE_METER_SUCCESS:
      return state.set('loading', false).mergeDeep({
        pendingMeters: { [action.meter.id.toString()]: action.meter },
      });
    case CREATE_METER_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_METER:
      return state.set('loading', true).set('error', null);
    case EDIT_METER_SUCCESS:
      return state.set('loading', false).mergeDeep({
        pendingMeters: { [action.meter.id.toString()]: action.meter },
      });
    case EDIT_METER_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default meterReducer;
