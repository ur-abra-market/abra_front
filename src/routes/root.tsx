import React from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';

import {
  ABOUT,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHECK_EMAIL,
  CONFIRM_EMAIL,
  CONTACT,
  FAQ,
  FORGOT_PASSWORD,
  HOME,
  LOGIN,
  NEWS,
  PRIVACY_POLICY,
  REGISTER,
  RESET_PASSWORD,
  SELL,
  TERMS_AND_CONDITIONS,
  TUTORIALS,
} from './constans/root';
import { sellerRoute } from './sellerRoute';
import { supplierRoute } from './supplierRoute';

import { UserRoleType } from 'common/types';
import { convertCombinedPrivateRoutes } from 'common/utils/combinePrivateRoutes';
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
} from 'pages/general-pages';

type Routes = ReturnType<typeof createBrowserRouter>;

export function createRoutes(userRole: UserRoleType): Routes {
  let child: RouteObject[] = [];

  if (userRole === 'supplier') child = supplierRoute;
  if (userRole === 'seller') child = sellerRoute;
  if (userRole === null) child = convertCombinedPrivateRoutes();

  return createBrowserRouter([
    {
      path: HOME,
      errorElement: (
        <main style={{ padding: '1rem' }}>
          <ErrorPage />
        </main>
      ),
      children: [
        ...child,
        {
          path: HOME,
          element: <MainPage />,
        },
        {
          path: REGISTER,
          element: <RegisterPage />,
        },
        {
          path: LOGIN,
          element: <LoginPage />,
        },
        {
          path: FORGOT_PASSWORD,
          element: <ForgotPasswordPage />,
        },
        {
          path: RESET_PASSWORD,
          element: <ResetPasswordPage />,
        },
        {
          path: CHANGE_PASSWORD,
          element: <ChangePasswordPage />,
        },
        {
          path: CHANGE_EMAIL,
          element: <ChangeEmailPage />,
        },
        {
          path: CONFIRM_EMAIL,
          element: <ConfirmEmailPage />,
        },
        {
          path: CHECK_EMAIL,
          element: <CheckEmailPage />,
        },
        {
          path: TERMS_AND_CONDITIONS,
          element: <TermsAndConditionsPage />,
        },
        {
          path: PRIVACY_POLICY,
          element: <PrivacyPolicyPage />,
        },
        {
          path: NEWS,
          element: <LastNewsPage />,
        },
        {
          path: CONTACT,
          element: <ContactSupportPage />,
        },
        {
          path: SELL,
          element: <SellAbraPage />,
        },
        {
          path: TUTORIALS,
          element: <TutorialPage />,
        },
        {
          path: ABOUT,
          element: <AboutUsPage />,
        },
        {
          path: FAQ,
          element: <FAQPage />,
        },
      ],
    },
  ]);
}
