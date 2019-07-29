import constants from '../modules/constants';

export const timerSeconds = (state = 0, action) => {
  switch(action.type) {
    case constants.timer.SET_TIMER_SECONDS :
      return action.seconds;
    
    default :
      return state;
  }
}

export const timerAction = (state = null, action) => {
  switch(action.type) {
    case constants.timer.SET_TIMER_ACTION :
      return action.action;
    
    default :
      return state;
  }
}