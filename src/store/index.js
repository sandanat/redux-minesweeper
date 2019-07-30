import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default () => createStore(
  rootReducer,
  {
    timerSeconds: 0,
    timerAction: null,
    configForm: {
      isOpen: false,
      useCellQuestionMark: false,
      selectedLevel: 'middle'
    },
    config: {
      rowsQty: 16,
      colsQty: 16,
      minesQty: 40,
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