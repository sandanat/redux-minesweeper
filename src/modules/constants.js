import getKey from './get-rows-cols-mines-key';

let consts = {
  marks: {
    FLAG: 'FLAG',
    QUESTION: 'QUESTION',
    NONE: 'NONE'
  },
  timer: {
    SET_TIMER_SECONDS: 'SET_TIMER_SECONDS',
    SET_TIMER_ACTION: 'SET_TIMER_ACTION'
  },
  game: {
    UPDATE_ROWS_COLS_MINES: "UPDATE_ROWS_COLS_MINES",
    UPDATE_CELLS_GRID: "UPDATE_CELLS_GRID"
  },
  configForm: {
    TOGGLE_CONFIG_FORM: "TOGGLE_CONFIG_FORM",
    TOGGLE_USE_CELL_QUESTION_MARK: "TOGGLE_USE_CELL_QUESTION_MARK",
    SELECTED_GAME_LEVEL: "SELECTED_GAME_LEVEL"
  },
  toggle: {
    UPDATE_QUESTION_MARK_ACCESS: "UPDATE_QUESTION_MARK_ACCESS"
  },
  gameLevels: {
    JUNIOR: "junior",
    MIDDLE: "middle",
    SENIOR: "senior"
  }
};

consts.map_gameLevel_gameConfig = {};

let levels = consts.gameLevels;

consts.map_gameLevel_gameConfig = {
  [levels.JUNIOR]: {
    rowsQty: 9,
    colsQty: 9,
    minesQty: 10
  }
};

consts.map_gameLevel_gameConfig[levels.MIDDLE] = {
  rowsQty: 16,
  colsQty: 16,
  minesQty: 40
};

consts.map_gameLevel_gameConfig[levels.SENIOR] = {
  rowsQty: 16,
  colsQty: 30,
  minesQty: 99
};

consts.map_gameConfig_gameLevel = {
  [getGameConfigKey(levels.JUNIOR, consts.map_gameLevel_gameConfig)]: levels.JUNIOR,
  [getGameConfigKey(levels.MIDDLE, consts.map_gameLevel_gameConfig)]: levels.MIDDLE,
  [getGameConfigKey(levels.SENIOR, consts.map_gameLevel_gameConfig)]: levels.SENIOR
};

function getGameConfigKey(level, map_gameLevel_gameConfig) {
  let { rowsQty, colsQty, minesQty } = map_gameLevel_gameConfig[level];
  
  return getKey(rowsQty, colsQty, minesQty);
}

export default consts;