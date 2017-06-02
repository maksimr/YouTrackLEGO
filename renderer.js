import {createElement as e} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {App} from './src/App';
import {db, write} from './src/db';

import {store} from './src/store';

const AppDb = db('App');
store.subscribe(renderApp);
store.subscribe(() => write(AppDb, store.getState()));

export const rootElement =
  document.getElementById('root') ||
  document.createElement('div');


function renderApp() {
  render(e(Provider, {store: store}, e(App)),
    rootElement);
}

renderApp();
