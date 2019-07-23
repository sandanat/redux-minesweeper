import constants from '../modules/constants';

export const config = (state = { config: {} }, action) => {
  switch (action.type) {
    case constants.game.UPDATE_ROWS_AND_COLS_QTY:
      return {...state, config: {...action.payload} };
    
    case constants.toggle.UPDATE_QUESTION_MARK_ACCESS:
      return { ...state, useCellQuestionMark: action.payload };

    default:
      return state;
  }
};

export const cellsGrid = (state = [[]], action) => {
  switch (action.type) {
    case constants.game.UPDATE_CELLS_GRID:
      return action.payload;

    default:
      return state;
  }
};