import {
  getInternalAnalysisIntervalLabel,
  getTypeLabelInternal,
} from './utilsInternal';

export const TYPE_CONSUMPTION = 'CONSUMPTION';
export const TYPE_FINANCIAL_COST = 'FINANCIAL_COST';
export const TYPE_POWER = 'POWER';
export const TYPE_POWER_FACTOR = 'POWER_FACTOR';
export const ALERT_TYPES = [
  {
    label: 'Consumo',
    value: TYPE_CONSUMPTION,
  },
  {
    label: 'Custo (R$)',
    value: TYPE_FINANCIAL_COST,
  },
  {
    label: 'Potência',
    value: TYPE_POWER,
  },
  {
    label: 'Fator de Potência',
    value: TYPE_POWER_FACTOR,
  },
];
export const PERMANENCE_TYPE_INSTANTLY = 'INSTANTLY';
export const PERMANENCE_TYPE_FIFTEEN_MINUTES = 'FIFTEEN_MINUTES';
export const PERMANENCE_TYPE_ONE_HOUR = 'ONE_HOUR';
export const PERMANENCE_TYPE_TWELVE_HOURS = 'TWELVE_HOURS';
export const PERMANENCE_TYPE_ONE_DAY = 'ONE_DAY';
export const PERMANENCE_TYPES = [
  {
    label: 'Alertar Imediatamente',
    tagLabel: 'Imediatamente',
    value: PERMANENCE_TYPE_INSTANTLY,
  },
  {
    label: 'Alertar se permanecer 15 minutos',
    tagLabel: '15 minutos',
    value: PERMANENCE_TYPE_FIFTEEN_MINUTES,
  },
  {
    label: 'Alertar se permanecer 1 hora',
    tagLabel: '1 hora',
    value: PERMANENCE_TYPE_ONE_HOUR,
  },
  {
    label: 'Alertar se permanecer 12 horas',
    tagLabel: '12 horas',
    value: PERMANENCE_TYPE_TWELVE_HOURS,
  },
  {
    label: 'Alertar se permanecer 24 horas',
    tagLabel: '24 horas',
    value: PERMANENCE_TYPE_ONE_DAY,
  },
];

export const UNIT_OPTIONS = {
  [TYPE_CONSUMPTION]: {
    initialValue: 'kWh',
    options: [
      {
        label: 'kWh',
        value: 'kWh',
      },
      {
        label: 'MWh',
        value: 'MWh',
      },
    ],
  },
  [TYPE_POWER]: {
    initialValue: 'kW',
    options: [
      {
        label: 'kW',
        value: 'kW',
      },
      {
        label: 'MW',
        value: 'MW',
      },
    ],
  },
  [TYPE_FINANCIAL_COST]: {
    initialValue: 'R$',
    options: [
      {
        label: 'R$',
        value: 'R$',
      },
    ],
  },
  [TYPE_POWER_FACTOR]: {},
};

export const SPECIFIC_VALUES_DECIMAL_OPTIONS = {
  [TYPE_CONSUMPTION]: { max: 9999999999999.99 },
  [TYPE_POWER]: { max: 9999999999999.99 },
  [TYPE_FINANCIAL_COST]: { ma: 9999999999999.99 },
  [TYPE_POWER_FACTOR]: { max: 1 },
};

export const ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE = 'COMPARED_VALUE';
export const ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE = 'SPECIFIC_VALUE';
export const ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE =
  'POWER_MORE_THAN_SPECIFIC_VALUE';
export const ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE =
  'POWER_LESS_THAN_SPECIFIC_VALUE';
export const ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE =
  'POWER_MORE_THAN_COMPARED_VALUE';
export const ALERT_CONDITION_POWER_LESS_THAN_COMPARED_VALUE =
  'POWER_LESS_THAN_COMPARED_VALUE';
export const ALERT_CONDITIONS = {
  [TYPE_CONSUMPTION]: [
    {
      value: ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE,
      getLabel: (alertType, analysisInterval) => {
        const alertTypeLabel = getTypeLabelInternal(ALERT_TYPES, alertType);
        const analysisIntervalLabel = getInternalAnalysisIntervalLabel(
          ANALYSIS_INTERVAL,
          analysisInterval
        );
        return `Quando o ${alertTypeLabel} de um dos medidores selecionados atingir um valor específico dentro de um intervalo de ${analysisIntervalLabel}`;
      },
    },
    {
      value: ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE,
      getLabel: (alertType) => {
        const alertTypeLabel = getTypeLabelInternal(ALERT_TYPES, alertType);
        return `Quando o ${alertTypeLabel} de um dos medidores no período atual for maior ou igual ao consumo desse mesmo medidor em um período anterior`;
      },
    },
  ],
  [TYPE_FINANCIAL_COST]: [
    {
      value: ALERT_CONDITION_CONSUMPTION_SPECIFIC_VALUE,
      getLabel: (alertType, analysisInterval) => {
        const alertTypeLabel = getTypeLabelInternal(ALERT_TYPES, alertType);
        const analysisIntervalLabel = getInternalAnalysisIntervalLabel(
          ANALYSIS_INTERVAL,
          analysisInterval
        );
        return `Quando o ${alertTypeLabel} de um dos medidores selecionados atingir um valor específico dentro de um intervalo de ${analysisIntervalLabel}`;
      },
    },
    {
      value: ALERT_CONDITION_CONSUMPTION_COMPARED_VALUE,
      getLabel: (alertType) => {
        const alertTypeLabel = getTypeLabelInternal(ALERT_TYPES, alertType);
        return `Quando o ${alertTypeLabel} de um dos medidores no período atual for maior ou igual ao consumo desse mesmo medidor em um período anterior`;
      },
    },
  ],
  [TYPE_POWER]: [
    {
      value: ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE,
      getLabel: () =>
        'Quando um valor de potência ficar acima de um valor específico',
    },
    {
      value: ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE,
      getLabel: () =>
        'Quando um valor de potência ficar abaixo de um valor específico',
    },
    {
      value: ALERT_CONDITION_POWER_MORE_THAN_COMPARED_VALUE,
      getLabel: () =>
        'Quando um valor de potência ficar acima de um período anterior',
    },
    {
      value: ALERT_CONDITION_POWER_LESS_THAN_COMPARED_VALUE,
      getLabel: () =>
        'Quando um valor de potência ficar abaixo de um período anterior',
    },
  ],
  [TYPE_POWER_FACTOR]: [
    {
      value: ALERT_CONDITION_POWER_MORE_THAN_SPECIFIC_VALUE,
      getLabel: () =>
        'Quando um valor de fator de potência ficar acima de um valor específico',
    },
    {
      value: ALERT_CONDITION_POWER_LESS_THAN_SPECIFIC_VALUE,
      getLabel: () =>
        'Quando um valor de fator de potência ficar abaixo de um valor específico',
    },
  ],
};

export const ANALYSIS_INTERVAL_ONE_MONTH = 'ONE_MONTH';
export const ANALYSIS_INTERVAL = [
  {
    label: '1 Hora',
    value: 'ONE_HOUR',
  },
  {
    label: '1 Dia',
    value: 'ONE_DAY',
  },
  {
    label: '1 Mês',
    value: ANALYSIS_INTERVAL_ONE_MONTH,
  },
];

export const FIELDS_BY_STEP = {
  type: ['type'],
  meters: ['meters'],
  analysisInterval: ['analysisInterval'],
  analysisIntervalMonth: [
    'analysisInterval',
    'isAnalysisIntervalMonthInDifferentDay',
  ],
  analysisIntervalMonthInDifferentDay: [
    'analysisInterval',
    'isAnalysisIntervalMonthInDifferentDay',
    'analysisDay',
  ],
  alertCondition: ['alertCondition'],
  fixedValue: ['value'],
  comparedValue: ['comparedValueSummary'],
  confirm: ['name'],
};

export const ANALYSIS_FREQUENCY =
  'A análise será feita de quanto em quanto tempo?';
