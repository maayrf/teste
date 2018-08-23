/**
 * THIS FILE MUST NOT IMPORT `constants.js` FILE
 * This file that can be used inside the constants.js file
 * without casuing circular dependency
 */

export const getInternalAnalysisIntervalLabel = (
  ANALYSIS_INTERVAL,
  analysisInterval
) =>
  ANALYSIS_INTERVAL.reduce((before, current) => {
    if (before) {
      return before;
    }
    return current.value === analysisInterval ? current.label : false;
  }, false);

export const getTypeLabelInternal = (ALERT_TYPES, type) =>
  ALERT_TYPES.reduce((before, current) => {
    if (before) {
      return before;
    }
    return current.value === type ? current.label : false;
  }, false);
