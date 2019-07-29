import constants from '../modules/constants';

export const configForm = (state = { }, action) => {
  switch (action.type) {
    case constants.configForm.TOGGLE_CONFIG_FORM :
      return {...state, isOpen: action.isOpen};

    case constants.configForm.TOGGLE_USE_CELL_QUESTION_MARK :
      return {...state, useCellQuestionMark: action.isUseQuestionMark};

    case constants.configForm.SELECTED_GAME_LEVEL :
        return { ...state, selectedLevel: action.level}

    default:
      return state;
  }
};