import { createStore } from 'redux';

import rootReducer from '../reducers';

export default () => createStore(
  rootReducer,
  {
    timerSeconds: 0,
    timerAction: null,
    configForm: {
      isOpen: false,
      useCellQuestionMark: false
    },
    config: {
      rowsQty: 16,
      colsQty: 30,
      minesQty: 40,
      useCellQuestionMark: false
    },
    cellsGrid: [[]]
  },
  // to enable redux devTools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);