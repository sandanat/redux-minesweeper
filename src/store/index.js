import { createStore } from 'redux';

import rootReducer from '../reducers';

export default () => createStore(
  rootReducer,
  {
   timerSeconds: 0,
   timerAction: null,
   config: {
     rowsQty: 16,
     colsQty: 30,
     minesQty: 99,
     useCellQuestionMark: true
   },
   cellsGrid: [[]]
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);