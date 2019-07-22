import constants from '../modules/constants';

// used to call Timer methods
// payload = method_name
export const setTimerAction = action => ({
  type: constants.timer.SET_TIMER_ACTION,
  payload: action
});

// used to update seconds in UI
export const setTimerSeconds = seconds => ({
  type: constants.timer.SET_TIMER_SECONDS,
  payload: seconds
});