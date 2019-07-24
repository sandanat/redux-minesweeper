import { combineReducers } from 'redux';

import { timerSeconds, timerAction } from './timer';
import { config, cellsGrid } from './game';
import { configForm } from './config-form';

export default combineReducers({
  timerSeconds,
  timerAction,
  config,
  cellsGrid,
  configForm
});