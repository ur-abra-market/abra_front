import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import routes from './routes/root';
// import App from './App';
import { store } from './store/createStore';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>,
);
reportWebVitals();
