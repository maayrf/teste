import { fromJS } from 'immutable';
import {
  LOAD_POWER_DEMAND,
  LOAD_POWER_DEMAND_SUCCESS,
  LOAD_POWER_DEMAND_ERROR,
} from './constants';
import { LOGOUT_USER } from '../LoginPage/constants';

const initialState = fromJS({
  loading: false,
  error: null,
  powerDemands: {},
});

function powerDemandPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    case LOAD_POWER_DEMAND:
      return state
        .set('powerDemands', fromJS({}))
        .set('loading', true)
        .set('error', null);
    case LOAD_POWER_DEMAND_SUCCESS:
      return state
        .set('loading', false)
        .set('powerDemands', fromJS(action.powerDemands));
    case LOAD_POWER_DEMAND_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default powerDemandPageReducer;
