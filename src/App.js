import React from 'react';

import './css/reset.css';
import './css/styles.css';

import Game from './containers/game';
import ConfigForm from './containers/config-form';

const App = () => (
  <React.Fragment>
    <Game />
    <ConfigForm />
  </React.Fragment>
);

export default App;
