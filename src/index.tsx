import React from 'react';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { createRoutes } from './routes/root';
import { store } from './store/createStore';

import { useAppSelector } from 'store/hooks';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

const RenderRoutes = (): JSX.Element => {
  const userRole = useAppSelector(state => state.login.userRole);

  return <RouterProvider router={createRoutes(userRole)} />;
};

root.render(
  <Provider store={store}>
    <RenderRoutes />
  </Provider>,
);
reportWebVitals();
