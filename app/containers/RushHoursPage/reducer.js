import { fromJS } from 'immutable';
import {
  LOAD_RUSH_HOURS,
  LOAD_RUSH_HOURS_ERROR,
  LOAD_RUSH_HOURS_SUCCESS,
  RUSH_HOURS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  rushHours: {},
  rushHoursFareAndWorkingHoursErrors: [],
});

function rushHoursPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_RUSH_HOURS:
      return state
        .set('rushHours', fromJS({}))
        .set('loading', true)
        .set('error', null);
    case LOAD_RUSH_HOURS_SUCCESS:
      return state
        .set('rushHours', fromJS(action.rushHours))
        .set('loading', false)
        .set(
          'rushHoursFareAndWorkingHoursErrors',
          fromJS(action.rushHours.rushHoursFareAndWorkingHoursErrors)
        )
        .set('error', null);
    case LOAD_RUSH_HOURS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case RUSH_HOURS_FARE_AND_WORKING_HOURS_ERRORS:
      return state.set(
        'rushHoursFareAndWorkingHoursErrors',
        fromJS(action.rushHoursFareAndWorkingHoursErrors)
      );
    default:
      return state;
  }
}

export default rushHoursPageReducer;
