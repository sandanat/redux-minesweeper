import constants from '../modules/constants';
import getGameConfig from '../modules/get-game-config';

export const config = (state = {}, action) => {
  switch (action.type) {
    case constants.game.UPDATE_ROWS_COLS_MINES :
      let { rowsQty, colsQty, minesQty } = getGameConfig(action.level);
      let useCellQuestionMark = action.isUseQuestionMark;
      
      return { useCellQuestionMark, rowsQty, colsQty, minesQty };

    default:
      return state;
  }
};

export const cellsGrid = (state = [[]], action) => {
  switch (action.type) {
    case constants.game.UPDATE_CELLS_GRID:
      return action.cellsGrid;

    default:
      return state;
  }
};