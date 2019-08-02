import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import consts from '../modules/constants'
import getGameConfig from '../modules/get-game-config';

let level = consts.gameLevels.MIDDLE;

export default () => createStore(
  rootReducer,
  {
    timerSeconds: 0,
    timerAction: null,
    configForm: {
      isOpen: false,
      useCellQuestionMark: false,
      selectedLevel: level
    },
    config: {
      ...getGameConfig(level),
      useCellQuestionMark: false
    },
    cellsGrid: [[]],
  },
  compose(
    applyMiddleware(thunk),
    // to enable redux devTools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);