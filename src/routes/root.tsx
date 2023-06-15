import React from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { UserRoleType } from '../common/types';
import { combinePrivateRoutes } from '../common/utils/combinePrivateRoutes';
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
  if (userRole === null) child = combinePrivateRoutes();

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
          path: 'terms_and_conditions',
          element: <TermsAndConditionsPage />,
        },
        {
          path: 'privacy_policy',
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
