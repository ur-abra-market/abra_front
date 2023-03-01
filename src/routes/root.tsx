import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import AuthPage from '../pages/AuthPage';
import ChangeEmailPage from '../pages/ChangeEmailPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { TermsAndConditions } from '../pages/TermsAndConditionsPage/TermsAndConditions';

import sellerRoute from './sellerRoute';
import supplierRoute from './supplierRoute';
import LastNews from "../components/News/LastNews";
import { ContactSupport } from "../components/Contact/ContactSupport";

const profile = localStorage.getItem('profile');

const child = profile ? supplierRoute : sellerRoute;

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <main style={{ padding: '1rem' }}>
        <ErrorPage />
      </main>
    ),
    children: [
      ...child,
      {
        path: 'auth',
        element: <AuthPage />,
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
      {
        path:'news',
        element:<LastNews/>
      },
      {
        path:'contact',
        element:<ContactSupport/>
      }
    ],
  },
]);

export default routes;
