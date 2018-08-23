import { fromJS } from 'immutable';
import {
  LOAD_REPORTS,
  LOAD_REPORTS_SUCCESS,
  LOAD_REPORTS_ERROR,
  REMOVE_REPORT,
  REMOVE_REPORT_SUCCESS,
  REMOVE_REPORT_ERROR,
  CREATE_REPORT,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_ERROR,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT,
  EDIT_REPORT_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  reports: {},
});

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_REPORT:
      return state.set('loading', true).set('error', null);
    case REMOVE_REPORT_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['reports', action.id.toString()]);
    case REMOVE_REPORT_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_REPORT:
      return state.set('loading', true).set('error', null);
    case CREATE_REPORT_SUCCESS:
      return state.set('loading', false).mergeDeep({
        reports: { [action.report.id.toString()]: action.report },
      });
    case CREATE_REPORT_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_REPORT:
      return state.set('loading', true).set('error', null);
    case EDIT_REPORT_SUCCESS:
      return state.set('loading', false).mergeDeep({
        reports: { [action.report.id.toString()]: action.report },
      });
    case EDIT_REPORT_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default reportReducer;
