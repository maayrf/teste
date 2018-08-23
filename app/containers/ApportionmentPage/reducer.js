import { fromJS } from 'immutable';
import {
  LOAD_APPORTIONMENTS,
  LOAD_APPORTIONMENTS_SUCCESS,
  LOAD_APPORTIONMENTS_ERROR,
  APPORTIONMENTS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  apportionments: {},
  apportionmentsFareAndWorkingHoursErrors: [],
});

function apportionmentPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_APPORTIONMENTS:
      return state
        .set('apportionments', fromJS({}))
        .set('loading', true)
        .set('error', null);
    case LOAD_APPORTIONMENTS_SUCCESS:
      return state
        .set('apportionments', fromJS(action.apportionments))
        .set('loading', false)
        .set('error', null);
    case LOAD_APPORTIONMENTS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case APPORTIONMENTS_FARE_AND_WORKING_HOURS_ERRORS:
      return state.set(
        'apportionmentsFareAndWorkingHoursErrors',
        fromJS(action.apportionmentsFareAndWorkingHoursErrors)
      );
    default:
      return state;
  }
}

export default apportionmentPageReducer;
