import { fromJS } from 'immutable';
import moment from 'moment';
import {
  LOAD_CONSUMPTION_FARE_BY_ID,
  LOAD_CONSUMPTION_FARE_BY_ID_ERROR,
  LOAD_CONSUMPTION_FARE_BY_ID_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function consumptionFareReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONSUMPTION_FARE_BY_ID:
      return state
        .set('loading', true)
        .set('success', null)
        .set('error', null);
    case LOAD_CONSUMPTION_FARE_BY_ID_ERROR:
      return state
        .set('loading', false)
        .set('success', null)
        .set('error', action.error);
    case LOAD_CONSUMPTION_FARE_BY_ID_SUCCESS:
      return state
        .set('loading', false)
        .set('success', {
          consumptionFare: {
            ...action.consumptionFare,
            startDate: moment(action.consumptionFare.startDate),
            endDate: moment(action.consumptionFare.endDate),
            rushStartTime: moment(
              action.consumptionFare.rushStartTime,
              'HH:mm'
            ),
            rushEndTime: moment(action.consumptionFare.rushEndTime, 'HH:mm'),
          },
          message: 'Pego com sucesso!',
        })
        .set('error', null);
    default:
      return state;
  }
}

export default consumptionFareReducer;
