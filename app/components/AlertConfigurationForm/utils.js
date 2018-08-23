import { ANALYSIS_INTERVAL, PERMANENCE_TYPES, ALERT_TYPES } from './constants';
import {
  getInternalAnalysisIntervalLabel,
  getTypeLabelInternal,
} from './utilsInternal';

export const getAnalysisIntervalLabel = (analysisInterval) =>
  getInternalAnalysisIntervalLabel(ANALYSIS_INTERVAL, analysisInterval);

export const getTypeLabel = (type) => getTypeLabelInternal(ALERT_TYPES, type);

export const getPermanenceTagLabel = (permanence) =>
  PERMANENCE_TYPES.reduce((before, current) => {
    if (before) {
      return before;
    }
    return current.value === permanence ? current.tagLabel : false;
  }, false);
