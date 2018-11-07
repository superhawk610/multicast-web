import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Sidebar from './Sidebar';

import NotFound from '../pages/NotFound';

import routes from '../routes';

const App = () => (
  <>
    <Sidebar />
    <Switch>
      {Object.keys(routes).map((key, index) => {
        const route = routes[key];
        return (
          <Route key={index} path={route.path} component={route.component} />
        );
      })}
      <Route exact path="/">
        <Redirect to="/hosts" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  </>
);

export default hot(module)(App);
