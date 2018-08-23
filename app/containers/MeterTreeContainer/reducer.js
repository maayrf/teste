import { fromJS } from 'immutable';
import {
  LOAD_METER_TREE,
  LOAD_METER_TREE_SUCCESS,
  LOAD_METER_TREE_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  meterTree: {},
});

function meterTreeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_METER_TREE:
      return state.set('loading', true).set('error', null);
    case LOAD_METER_TREE_SUCCESS:
      return state.set('loading', false).set('meterTree', action.meterTree);
    case LOAD_METER_TREE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default meterTreeReducer;
