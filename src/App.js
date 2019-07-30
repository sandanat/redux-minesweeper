import React from 'react';

import Game from './containers/game';
// todo refactor this to lazy load, too large main bundle
import ConfigForm from './containers/config-form';

const App = () => (
  <React.Fragment>
    <Game />
    <ConfigForm />
  </React.Fragment>
);

export default App;
