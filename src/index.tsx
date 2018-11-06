import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

import configureStore from './configureStore';

const store = configureStore();

if (process.env.NODE_ENV === 'development') {
  (window as any).reduxStore = store;
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
