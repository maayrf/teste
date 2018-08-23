import { fromJS } from 'immutable';
import {
  LOAD_BRANCH_WORKING_HOURS,
  LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_SUCCESS,
  LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: true,
  error: null,
  workingHours: [],
  totalCount: 0,
  limit: 15,
  offset: null,
});

function branchOrMeterPaginatedWorkingHoursContainerReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOAD_BRANCH_WORKING_HOURS:
      return state.set('loading', true).set('error', null);
    case LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_SUCCESS:
      return state
        .set('workingHours', fromJS(action.workingHours))
        .set('loading', false)
        .set('totalCount', action.totalCount)
        .set('limit', action.limit)
        .set('offset', action.offset);
    case LOAD_PAGINATED_INFO_OF_BRANCH_WORKING_HOURS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default branchOrMeterPaginatedWorkingHoursContainerReducer;
