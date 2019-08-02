import constants from '../modules/constants';
import getGameLevel from '../modules/get-game-level'

export const openConfigForm = () => {
  return (dispatch, getState) => {
    let state = getState();
    let { rowsQty, colsQty, minesQty, useCellQuestionMark } = state.config;
    let level = getGameLevel(rowsQty, colsQty, minesQty);

    dispatch(selectGameLevel(level));
    dispatch(toggleUseQuestionMark(useCellQuestionMark));
    dispatch(toggleConfigForm(true))
  }
}

export const toggleConfigForm = isOpen => ({
  type: constants.configForm.TOGGLE_CONFIG_FORM,
  isOpen
});

export const toggleUseQuestionMark = isUse => ({
  type: constants.configForm.TOGGLE_USE_CELL_QUESTION_MARK,
  isUseQuestionMark: isUse
});

export const selectGameLevel = level => ({
  type: constants.configForm.SELECTED_GAME_LEVEL,
  level
});

export const updateGameConfig = (isUseQuestionMark, level) => ({
  type: constants.game.UPDATE_ROWS_COLS_MINES,
  isUseQuestionMark,
  level
});

export const saveFormButtonHandler = () => {
  return (dispatch, getState) => {
    let state = getState();
    let { useCellQuestionMark, selectedLevel } = state.configForm;

    dispatch(updateGameConfig(useCellQuestionMark, selectedLevel));
    dispatch(toggleConfigForm(false));
  }
}