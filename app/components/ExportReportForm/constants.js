import {
  ONE_DAY,
  ONE_HOUR,
  RAW_DATA,
  ONE_MONTH,
} from '../../containers/MetersTreeFilter/constants';

export const DEFAULT_SCALE_VISUALIZATION_OPTIONS = [
  { label: '1 Hora', value: ONE_HOUR },
  { label: '1 Dia', value: ONE_DAY },
  { label: '1 Mês', value: ONE_MONTH },
  { label: '*Dados brutos', value: RAW_DATA },
];
