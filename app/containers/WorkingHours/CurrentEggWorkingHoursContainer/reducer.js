import { fromJS } from 'immutable';
import {
  LOAD_CURRENT_WORKING_HOURS_OF_EGG,
  LOAD_CURRENT_WORKING_HOURS_OF_EGG_ERROR,
  LOAD_CURRENT_WORKING_HOURS_OF_EGG_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: null,
  success: false,
  currentEggWorkingHours: {},
});

function currentEggWorkingHoursContainerReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CURRENT_WORKING_HOURS_OF_EGG_SUCCESS:
      return state
        .set('currentEggWorkingHours', fromJS(action.currentEggWorkingHours))
        .set('loading', false)
        .set('success', true)
        .set('error', null);
    case LOAD_CURRENT_WORKING_HOURS_OF_EGG:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', null);
    case LOAD_CURRENT_WORKING_HOURS_OF_EGG_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default currentEggWorkingHoursContainerReducer;
