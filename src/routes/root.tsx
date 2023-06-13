import React from 'react';

import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

import { UserRoleType } from '../common/types';
import {
  AboutUsPage,
  ChangeEmailPage,
  ChangePasswordPage,
  ConfirmEmailPage,
  ContactSupportPage,
  ErrorPage,
  FAQPage,
  ForgotPasswordPage,
  LastNewsPage,
  PrivacyPolicyPage,
  ResetPasswordPage,
  SellAbraPage,
  TermsAndConditionsPage,
  TutorialPage,
  CheckEmailPage,
  LoginPage,
  RegisterPage,
  MainPage,
} from '../pages/general-pages';

import { sellerRoute } from './sellerRoute';
import { supplierRoute } from './supplierRoute';

type Routes = ReturnType<typeof createBrowserRouter>;

export function createRoutes(userRole: UserRoleType): Routes {
  let child: RouteObject[] = [];

  if (userRole === 'supplier') child = supplierRoute;
  if (userRole === 'seller') child = sellerRoute;

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
          path: '*',
          element: <Navigate to="/login" />,
        },
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'forgot_password',
          element: <ForgotPasswordPage />,
        },
        {
          path: 'reset_password',
          element: <ResetPasswordPage />,
        },
        {
          path: 'change_password',
          element: <ChangePasswordPage />,
        },
        {
          path: 'change_email',
          element: <ChangeEmailPage />,
        },
        {
          path: 'register/confirm_email',
          element: <ConfirmEmailPage />,
        },
        {
          path: 'register/check_email',
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
