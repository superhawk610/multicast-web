import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Hosts from '../pages/Hosts';
import NotFound from '../pages/NotFound';

const App = () => (
  <Switch>
    <Route path="/hosts" component={Hosts} />
    <Route exact path="/">
      <Redirect to="/hosts" />
    </Route>
    <Route component={NotFound} />
  </Switch>
);

export default hot(module)(App);
