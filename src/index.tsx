import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { store } from './store/createStore';

import './index.scss';
import { App } from 'App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
reportWebVitals();
