export const LOAD_METERS = 'MetersTreeFilterPage/LOAD_METERS';
export const LOAD_METERS_SUCCESS = 'MetersTreeFilterPage/LOAD_METERS_SUCCESS';
export const LOAD_METERS_ERROR = 'MetersTreeFilterPage/LOAD_METERS_ERROR';

export const TOGGLE_CHECK_METER = 'MetersTreeFilterPage/TOGGLE_CHECK_METER';
export const SET_SCALE_VISUALIZATION =
  'MetersTreeFilterPage/SET_SCALE_VISUALIZATION';
export const SET_INIT_AND_END_DATE =
  'MetersTreeFilterPage/SET_INIT_AND_END_DATE';

export const FIFTEEN_MINUTES = '15Min';
export const THIRTY_MINUTES = '30Min';
export const ONE_HOUR = '1Hour';
export const ONE_DAY = '1Day';
export const ONE_WEEK = '1Week';
export const ONE_MONTH = '1Month';
export const RAW_DATA = 'RAW_DATA';

export const FIFTEEN_MINUTES_DESCRIPTION = 'Limite de 6 horas de seleção';
export const THIRTY_MINUTES_DESCRIPTION = 'Limite de 12 horas de seleção';
export const ONE_HOUR_DESCRIPTION = 'Limite de 24 horas de seleção';
export const ONE_DAY_DESCRIPTION = 'Limite de 1 mês de seleção';
export const ONE_WEEK_DESCRIPTION = 'Limite de 26 semanas de seleção';
export const ONE_MONTH_DESCRIPTION = 'Limite de 24 meses de seleção';
export const RAW_DATA_DESCRIPTION = 'Não é possível selecionar horários.';

export const SELECT_METER = 'MetersTreeFilterPage/SELECT_METER';
export const CLEAR_CHECKED_METERS = 'MetersTreeFilterPage/CLEAR_CHECKED_METERS';

export const DEFAULT_SCALE_VISUALIZATION_OPTIONS = [
  { label: '15 Min', value: FIFTEEN_MINUTES },
  { label: '30 Min', value: THIRTY_MINUTES },
  { label: '1 Hora', value: ONE_HOUR },
  { label: '1 Dia', value: ONE_DAY },
  { label: '1 Semana', value: ONE_WEEK },
  { label: '1 Mês', value: ONE_MONTH },
];

export const DEFAULT_SCALE_VISUALIZATION_DESCRIPTIONS = [
  FIFTEEN_MINUTES,
  THIRTY_MINUTES,
  ONE_HOUR,
  ONE_DAY,
  ONE_WEEK,
  ONE_MONTH,
];
