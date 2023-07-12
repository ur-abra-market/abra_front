import React from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { store } from './store/createStore';

import './index.css';
import { App } from 'App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <GoogleOAuthProvider clientId="205069237634-fsd819li5hah309ndl0fd8o47fjqdfbe.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
);
reportWebVitals();
