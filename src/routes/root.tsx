import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { UserRoleType } from '../common/types';
import {
  AboutUsPage,
  ChangeEmailPage,
  ChangePasswordPage,
  CheckEmailPage,
  ConfirmEmailPage,
  ContactSupportPage,
  ErrorPage,
  FAQPage,
  ForgotPasswordPage,
  LastNewsPage,
  LoginPage,
  PrivacyPolicyPage,
  RegisterPage,
  ResetPasswordPage,
  SellAbraPage,
  TermsAndConditionsPage,
  TutorialPage,
} from '../pages/commonPages';

import { sellerRoute } from './sellerRoute';
import { supplierRoute } from './supplierRoute';

type Routes = ReturnType<typeof createBrowserRouter>;

export function createRoutes(userRole: UserRoleType): Routes {
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
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
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
          path: 'register/confirmEmail',
          element: <ConfirmEmailPage />,
        },
        {
          path: 'register/checkEmail',
          element: <CheckEmailPage />,
        },
        {
          path: 'terms&conditions',
          element: <TermsAndConditionsPage />,
        },
        {
          path: 'privacy&policy',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'news',
          element: <LastNewsPage />,
        },
        {
          path: 'contact',
          element: <ContactSupportPage />,
        },
        {
          path: 'sell',
          element: <SellAbraPage />,
        },
        {
          path: 'tutorials',
          element: <TutorialPage />,
        },
        {
          path: 'about',
          element: <AboutUsPage />,
        },
        {
          path: 'faq',
          element: <FAQPage />,
        },
      ],
    },
  ]);
}
