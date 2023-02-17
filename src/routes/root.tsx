import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import Auth from '../layouts/Auth';
import Main from '../layouts/Main';
import ChangeEmailPage from '../pages/ChangeEmailPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { TermsAndConditions } from '../pages/TermsAndConditionsPage/TermsAndConditions';

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
    path: 'changePassword',
    element: <ChangePasswordPage />,
  },
  {
    path: 'changeEmail',
    element: <ChangeEmailPage />,
  },
  {
    path: 'register/email-confirmation',
    element: <ConfirmEmailPage />,
  },
  {
    path: 'terms&conditions',
    element: <TermsAndConditions />,
  },
]);

export default routes;
