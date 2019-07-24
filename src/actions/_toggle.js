import constants from '../modules/constants';

export const updateCheckbox = bool => ({
  type: constants.toggle.UPDATE_QUESTION_MARK_ACCESS,
  payload: bool
});