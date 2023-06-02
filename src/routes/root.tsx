import React from 'react';

import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

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
} from '../pages/commonPages';
import { MainPage } from '../pages/commonPages/MainPage/MainPage';

import { sellerRoute } from './sellerRoute';
import { supplierRoute } from './supplierRoute';

import { userRoleType } from 'services/auth/auth.serviceTypes';

type Routes = ReturnType<typeof createBrowserRouter>;

export function createRoutes(userRole: userRoleType): Routes {
  // const child = userRole === 'supplier' ? supplierRoute : sellerRoute;
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
