import { combineReducers } from 'redux';

import { timerSeconds, timerAction } from './timer';
import { config, cellsGrid } from './game';

export default combineReducers({
  timerSeconds,
  timerAction,
  config,
  cellsGrid
});