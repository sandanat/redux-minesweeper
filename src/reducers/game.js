import constants from '../modules/constants';

export const config = (state = {}, action) => {
  switch (action.type) {
    case constants.game.UPDATE_ROWS_COLS_MINES :
      let rowsQty, colsQty, minesQty;
      let useCellQuestionMark = action.isUseQuestionMark;
      
      switch(action.level) {
        case 'junior' :
          rowsQty = 9;
          colsQty = 9;
          minesQty = 10;
          break;

        case 'middle' :
          rowsQty = 16;
          colsQty = 16;
          minesQty = 40;
          break;

        case 'seniour' :
          rowsQty = 16;
          colsQty = 30;
          minesQty = 99;
          break;

        default:
          break;
      }
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