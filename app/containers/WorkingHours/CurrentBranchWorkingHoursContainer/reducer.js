import { fromJS } from 'immutable';
import {
  LOAD_CURRENT_WORKING_HOURS_OF_BRANCH,
  LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_ERROR,
  LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: null,
  success: false,
  currentBranchWorkingHours: {},
});

function currentBranchWorkingHoursContainerReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_SUCCESS:
      return state
        .set(
          'currentBranchWorkingHours',
          fromJS(action.currentBranchWorkingHours)
        )
        .set('loading', false)
        .set('success', true)
        .set('error', null);
    case LOAD_CURRENT_WORKING_HOURS_OF_BRANCH:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', null);
    case LOAD_CURRENT_WORKING_HOURS_OF_BRANCH_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default currentBranchWorkingHoursContainerReducer;
