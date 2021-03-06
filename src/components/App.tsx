import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { setConfig, hot } from 'react-hot-loader';
import styled from 'styled-components';

import Sidebar from './Sidebar';
import SandboxWarning from './SandboxWarning';
import ConfirmDialog from './ConfirmDialog';

import NotFound from '../pages/NotFound';

import routes from '../routes';

// FIXME: it seems that styled-components v4 may be causing
// tons of incorrect error logs, the issue is currently tracked
// at https://github.com/gaearon/react-hot-loader/issues/1034.
// this disables react-hot-loader logging entirely
setConfig({ logLevel: 'disable-all-errors' });

const App = () => (
  <>
    <Sidebar />
    <SandboxWarning />
    <ConfirmDialog />
    <Constraint>
      <Switch>
        {Object.keys(routes).map((key, index) => {
          const route = routes[key];
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
        <Route exact path="/">
          <Redirect to="/hosts" />
        </Route>
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Constraint>
  </>
);

const Constraint = styled.div`
  max-width: 1250px;
`;

export default hot(module)(App);
