import { fromJS } from 'immutable';
import {
  LOAD_SELECT_DEALERSHIPS,
  LOAD_SELECT_DEALERSHIPS_SUCCESS,
  LOAD_SELECT_DEALERSHIPS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  selectDealerships: [],
});

function selectDealershipReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SELECT_DEALERSHIPS:
      return state.set('loading', true).set('error', null);
    case LOAD_SELECT_DEALERSHIPS_SUCCESS:
      return state
        .set('loading', false)
        .set('selectDealerships', action.selectDealerships);
    case LOAD_SELECT_DEALERSHIPS_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default selectDealershipReducer;
