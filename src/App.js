// не поправлено
import React from 'react';

import './css/reset.css';
import './css/styles.css';
import './css/config_form.css';
import './css/toggle.css';
import './css/radiobutton.css';

import Game from './containers/game';

const configFormPromise = import(
  /* webpackChunkName: 'ConfigForm' */'./components/config_form'
);

const ConfigForm = React.lazy(() => configFormPromise);

const App = () => (
  <Game
    cellsGrid={[[{}, {}]]}
    config={{ minesQty: 0 }}

  />
);

export default App;
