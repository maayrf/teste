import moment from 'moment';
import {
  FIFTEEN_MINUTES,
  ONE_DAY,
  ONE_HOUR,
  ONE_MONTH,
  ONE_WEEK,
  RAW_DATA,
  THIRTY_MINUTES,
} from '../../containers/MetersTreeFilter/constants';

export const DATE_FORMAT_PTBR_WITH_TIME = 'DD/MM/YYYY HH:mm';
export const DATE_FORMAT_PTBR = 'DD/MM/YYYY';

export const MIN_MAX_BY_FILTER = {
  [ONE_HOUR]: {
    minByHours: 1,
    maxByHours: 24,
  },
  [ONE_WEEK]: {
    maxByWeeks: 26,
  },
  [ONE_DAY]: {
    maxByDates: 31,
  },
  [THIRTY_MINUTES]: {
    maxByHours: 12,
  },
  [FIFTEEN_MINUTES]: {
    maxByHours: 6,
  },
};

export const TIME_OPTIONS = {
  [FIFTEEN_MINUTES]: {
    defaultValue: moment().minutes(0),
    format: 'HH:mm',
    minuteStep: 15,
  },
  [THIRTY_MINUTES]: {
    defaultValue: moment().minutes(0),
    format: 'HH:mm',
    minuteStep: 30,
  },
  [ONE_HOUR]: {
    defaultValue: moment().minutes(0),
    format: 'HH:mm',
    minuteStep: 30,
  },
};

export const DATE_OPTIONS = {
  [FIFTEEN_MINUTES]: {
    format: DATE_FORMAT_PTBR_WITH_TIME,
    minuteStep: 15,
  },
  [THIRTY_MINUTES]: {
    format: DATE_FORMAT_PTBR_WITH_TIME,
    minuteStep: 30,
  },
  [ONE_HOUR]: {
    format: DATE_FORMAT_PTBR_WITH_TIME,
  },
  [ONE_DAY]: {
    disabledDate: true,
    format: DATE_FORMAT_PTBR,
  },
  [ONE_WEEK]: {
    disabledDate: true,
    format: DATE_FORMAT_PTBR,
  },
  [ONE_MONTH]: {
    disabledDate: true,
    format: DATE_FORMAT_PTBR,
  },
  [RAW_DATA]: {
    format: DATE_FORMAT_PTBR,
  },
};
