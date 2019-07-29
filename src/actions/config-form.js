import constants from '../modules/constants';

export const toggleConfigForm = isOpen => ({
  type: constants.configForm.TOGGLE_CONFIG_FORM,
  payload: isOpen
});

export const toggleUseQuestionMark = isUse => ({
  type: constants.configForm.TOGGLE_USE_CELL_QUESTION_MARK,
  payload: isUse
});