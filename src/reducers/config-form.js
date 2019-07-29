import constants from '../modules/constants';

export const configForm = (state = { }, action) => {
  switch (action.type) {
    case constants.configForm.TOGGLE_CONFIG_FORM :
      return {...state, isOpen: action.payload};

    case constants.configForm.TOGGLE_USE_CELL_QUESTION_MARK :
      return {...state, useCellQuestionMark: action.payload};

    default:
      return state;
  }
};