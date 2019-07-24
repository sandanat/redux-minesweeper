import { createStore } from 'redux';

import rootReducer from '../reducers';

export default () => createStore(
  rootReducer,
  {
    timerSeconds: 0,
    timerAction: null,
    configForm: {
      isOpen: false
    },
    config: {
      rowsQty: 9,
      colsQty: 9,
      minesQty: 10,
      useCellQuestionMark: true
    },
    cellsGrid: [[]]
  },
  // to enable redux devTools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);