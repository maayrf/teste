import { fromJS } from 'immutable';
import {
  REMOVE_FILL_KPI_REPORT,
  REMOVE_FILL_KPI_REPORT_SUCCESS,
  REMOVE_FILL_KPI_REPORT_ERROR,
  CREATE_FILL_KPI_REPORT,
  CREATE_FILL_KPI_REPORT_SUCCESS,
  CREATE_FILL_KPI_REPORT_ERROR,
  EDIT_FILL_KPI_REPORT_SUCCESS,
  EDIT_FILL_KPI_REPORT,
  EDIT_FILL_KPI_REPORT_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: null,
  success: null,
});

function fillKpiReportFormReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_FILL_KPI_REPORT:
      return state.set('loading', true).set('error', null);
    case REMOVE_FILL_KPI_REPORT_SUCCESS:
      return state
        .set('loading', false)
        .deleteIn(['fillKpiReport', action.id.toString()]);
    case REMOVE_FILL_KPI_REPORT_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CREATE_FILL_KPI_REPORT:
      return state.set('loading', true).set('error', null);
    case CREATE_FILL_KPI_REPORT_SUCCESS:
      return state
        .set('success', {
          fillKpiReport: action.fillKpiReport,
          message: `FillKpiReport ${
            action.fillKpiReport.id
          } criado com sucesso!`,
        })
        .set('loading', false);
    case CREATE_FILL_KPI_REPORT_ERROR:
      return state.set('loading', false).set('error', action.error);
    case EDIT_FILL_KPI_REPORT:
      return state
        .set('loading', true)
        .set('error', null)
        .set('success', null);
    case EDIT_FILL_KPI_REPORT_SUCCESS:
      return state
        .set('success', {
          fillKpiReport: action.fillKpiReport,
          message: 'Relatório de KPI registrado com sucesso!',
        })
        .set('loading', false);
    case EDIT_FILL_KPI_REPORT_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default fillKpiReportFormReducer;
