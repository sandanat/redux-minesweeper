import constants from '../modules/constants';

export const configForm = (state = { }, action) => {
  switch (action.type) {
    case constants.configForm.TOGGLE_CONFIG_FORM :
      return {...state, isOpen: action.payload};

    default:
      return state;
  }
};