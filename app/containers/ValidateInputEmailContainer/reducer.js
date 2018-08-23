import { fromJS } from 'immutable';
import {
  LOAD_VALIDATE_INPUT_EMAILS,
  LOAD_VALIDATE_INPUT_EMAILS_SUCCESS,
  LOAD_VALIDATE_INPUT_EMAILS_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  availableEmail: {
    success: null,
    error: '',
  },
});

function validateInputEmailReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_VALIDATE_INPUT_EMAILS:
      return state.set('loading', true).set('error', null);
    case LOAD_VALIDATE_INPUT_EMAILS_SUCCESS:
      return state
        .set('loading', false)
        .set('availableEmail', fromJS(action.availableEmail));
    case LOAD_VALIDATE_INPUT_EMAILS_ERROR:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set('success', false);
    default:
      return state;
  }
}

export default validateInputEmailReducer;
