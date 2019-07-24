import constants from '../modules/constants';

export const toggleConfigForm = isOpen => ({
  type: constants.configForm.TOGGLE_CONFIG_FORM,
  payload: isOpen
});