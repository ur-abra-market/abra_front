import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ConfirmEmailPage from '../components/pages/ConfirmEmailPage';
import ErrorPage from '../components/pages/ErrorPage/ErrorPage';
import ForgotPasswordPage from '../components/pages/ForgotPasswordPage';
import ResetPasswordPage from '../components/pages/ResetPasswordPage';
import Auth from '../layouts/Auth';
import Main from '../layouts/Main';

import sellerRoute from './sellerRoute';
import supplierRoute from './supplierRoute';

const profile = localStorage.getItem('profile');

const child = profile ? supplierRoute : sellerRoute;

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: (
      <main style={{ padding: '1rem' }}>
        <ErrorPage />
      </main>
    ),
    children: [...child],
  },
  {
    path: 'auth',
    element: <Auth />,
  },
  {
    path: 'forgotPassword',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'resetPassword',
    element: <ResetPasswordPage />,
  },
  {
    path: 'register/email-confirmation',
    element: <ConfirmEmailPage />,
  },
]);

export default routes;
