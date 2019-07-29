import React from 'react';

import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/reset.css';
import './css/styles.css';
import './css/toggle.css';
import './css/radiobutton.css';
import './css/config-form.css';

import Game from './containers/game';
import ConfigForm from './containers/config-form';

const App = () => (
  <React.Fragment>
    <Game />
    <ConfigForm />
  </React.Fragment>
);

export default App;
