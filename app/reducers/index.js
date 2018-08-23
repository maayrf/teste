/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import globalReducer from '../containers/App/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    router: routerReducer,
    global: globalReducer,
    ...injectedReducers,
  });
}
