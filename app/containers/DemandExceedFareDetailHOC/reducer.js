import { fromJS } from 'immutable';
import moment from 'moment';
import {
  LOAD_DEMAND_EXCEED_FARE_BY_ID,
  LOAD_DEMAND_EXCEED_FARE_BY_ID_ERROR,
  LOAD_DEMAND_EXCEED_FARE_BY_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function demandExceedFareReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DEMAND_EXCEED_FARE_BY_ID:
      return state
        .set('loading', true)
        .set('success', null)
        .set('error', null);
    case LOAD_DEMAND_EXCEED_FARE_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('success', null)
        .set('error', action.error);
    case LOAD_DEMAND_EXCEED_FARE_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('success', {
          demandExceedFare: {
            ...action.demandExceedFare,
            startDate: moment(action.demandExceedFare.startDate),
            endDate: moment(action.demandExceedFare.endDate),
            rushStartTime: moment(
              action.demandExceedFare.rushStartTime,
              'HH:mm'
            ),
            rushEndTime: moment(action.demandExceedFare.rushEndTime, 'HH:mm'),
          },
          message: 'Pego com sucesso!',
        })
        .set('error', null);
    default:
      return state;
  }
}

export default demandExceedFareReducer;
