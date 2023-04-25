import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { ContactSupport } from '../components/Contact/ContactSupport';
import LastNews from '../components/News/LastNews';
import { SellAbra } from '../components/SellAbra/SellAbra';
import Tutorial from '../components/Tutorial/Tutorial';
import AuthPage from '../pages/AuthPage';
import ChangeEmailPage from '../pages/ChangeEmailPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ConfirmEmailPage from '../pages/ConfirmEmailPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import { PrivacyPolicy } from '../pages/PrivacyPolicyPage/PrivacyPolicy';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { TermsAndConditions } from '../pages/TermsAndConditionsPage/TermsAndConditions';

import sellerRoute from './sellerRoute';
import supplierRoute from './supplierRoute';

export function createRoutes(userRole: any): any {
  const child = userRole === 'supplier' ? supplierRoute : sellerRoute;

  return createBrowserRouter([
    {
      path: '/',
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
          path: 'news',
          element: <LastNews />,
        },
        {
          path: 'contact',
          element: <ContactSupport />,
        },
        {
          path: 'sell',
          element: <SellAbra />,
        },
        {
          path: 'tutorials',
          element: <Tutorial />,
        },
      ],
    },
  ]);
}