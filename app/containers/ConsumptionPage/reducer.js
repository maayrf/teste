import { fromJS } from 'immutable';
import {
  LOAD_CONSUMPTIONS,
  LOAD_CONSUMPTIONS_SUCCESS,
  LOAD_CONSUMPTIONS_ERROR,
  CONSUMPTIONS_ERRORS,
  CONSUMPTIONS_FARE_AND_WORKING_HOURS_ERRORS,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  consumptions: {},
  consumptionsErrors: [],
  consumptionsFareAndWorkingHoursErrors: [],
});

function consumptionPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_CONSUMPTIONS:
      return state
        .set('consumptions', fromJS({}))
        .set('loading', true)
        .set('error', null);
    case LOAD_CONSUMPTIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('consumptions', fromJS(action.consumptions));
    case LOAD_CONSUMPTIONS_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CONSUMPTIONS_ERRORS:
      return state.set('consumptionErrors', action.consumptionsErrors);
    case CONSUMPTIONS_FARE_AND_WORKING_HOURS_ERRORS:
      return state.set(
        'consumptionsFareAndWorkingHoursErrors',
        fromJS(action.consumptionsFareAndWorkingHoursErrors)
      );
    default:
      return state;
  }
}

export default consumptionPageReducer;
