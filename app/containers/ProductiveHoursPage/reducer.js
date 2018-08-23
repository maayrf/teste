import { fromJS } from 'immutable';
import {
  LOAD_PRODUCTIVE_HOURS,
  LOAD_PRODUCTIVE_HOURS_ERROR,
  LOAD_PRODUCTIVE_HOURS_SUCCESS,
  PRODUCTIVE_HOURS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  productiveHours: {},
  productiveHoursFareAndWorkingHoursErrors: [],
});

function productiveHoursPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_PRODUCTIVE_HOURS:
      return state
        .set('productiveHours', fromJS({}))
        .set('loading', true)
        .set('error', null);
    case LOAD_PRODUCTIVE_HOURS_SUCCESS:
      return state
        .set('productiveHours', fromJS(action.productiveHours))
        .set('loading', false)
        .set('error', null);
    case LOAD_PRODUCTIVE_HOURS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case PRODUCTIVE_HOURS_FARE_AND_WORKING_HOURS_ERRORS:
      return state.set(
        'productiveHoursFareAndWorkingHoursErrors',
        fromJS(action.productiveHoursFareAndWorkingHoursErrors)
      );
    default:
      return state;
  }
}

export default productiveHoursPageReducer;
