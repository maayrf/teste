import { fromJS } from 'immutable';
import {
  LOAD_METERS,
  LOAD_METERS_SUCCESS,
  LOAD_METERS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  meters: {},
  totalCount: 0,
  limit: 15,
});

function meterReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_METERS:
      return state.set('loading', true).set('error', null);
    case LOAD_METERS_SUCCESS:
      return state
        .set('loading', false)
        .set('meters', action.meters)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit);
    case LOAD_METERS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default meterReducer;
