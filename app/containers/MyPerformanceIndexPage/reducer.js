import { fromJS } from 'immutable';
import {
  LOAD_MY_PERFORMANCE_INDEXS,
  LOAD_MY_PERFORMANCE_INDEXS_SUCCESS,
  LOAD_MY_PERFORMANCE_INDEXS_ERROR,
  REMOVE_MY_PERFORMANCE_INDEX,
  REMOVE_MY_PERFORMANCE_INDEX_SUCCESS,
  REMOVE_MY_PERFORMANCE_INDEX_ERROR,
  CREATE_MY_PERFORMANCE_INDEX,
  CREATE_MY_PERFORMANCE_INDEX_SUCCESS,
  CREATE_MY_PERFORMANCE_INDEX_ERROR,
  EDIT_MY_PERFORMANCE_INDEX_SUCCESS,
  EDIT_MY_PERFORMANCE_INDEX,
  EDIT_MY_PERFORMANCE_INDEX_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  myPerformanceIndex: {},
});

function myPerformanceIndexReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_PERFORMANCE_INDEXS:
      return state.set('loading', true).set('error', null);
    case LOAD_MY_PERFORMANCE_INDEXS_SUCCESS:
      return state
        .set('loading', false)
        .set('myPerformanceIndex', action.myPerformanceIndex);
    case LOAD_MY_PERFORMANCE_INDEXS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case REMOVE_MY_PERFORMANCE_INDEX:
      return state.set('loading', true).set('error', null);
    case REMOVE_MY_PERFORMANCE_INDEX_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['myPerformanceIndex', action.id.toString()]);
    case REMOVE_MY_PERFORMANCE_INDEX_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_MY_PERFORMANCE_INDEX:
      return state.set('loading', true).set('error', null);
    case CREATE_MY_PERFORMANCE_INDEX_SUCCESS:
      return state.set('loading', false).mergeDeep({
        myPerformanceIndexs: {
          [action.myPerformanceIndex.id.toString()]: action.myPerformanceIndex,
        },
      });
    case CREATE_MY_PERFORMANCE_INDEX_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_MY_PERFORMANCE_INDEX:
      return state.set('loading', true).set('error', null);
    case EDIT_MY_PERFORMANCE_INDEX_SUCCESS:
      return state.set('loading', false).mergeDeep({
        myPerformanceIndexs: {
          [action.myPerformanceIndex.id.toString()]: action.myPerformanceIndex,
        },
      });
    case EDIT_MY_PERFORMANCE_INDEX_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default myPerformanceIndexReducer;
