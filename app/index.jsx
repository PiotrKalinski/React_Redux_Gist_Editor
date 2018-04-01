import React from 'react';
import { render } from 'react-dom';
import './styles/styles.less';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './stores/configure';
import Entry from './containers/Entry';

if (module.hot) {
  module.hot.accept();
}

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Entry />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
