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
  PRODUCTS_LIST,
  REGISTER,
  RESET_PASSWORD,
  SELL,
  TERMS_AND_CONDITIONS,
  TUTORIALS,
  sellerRoutes,
  supplierRoutes,
  convertCombinedPrivateRoutes,
  PRODUCT_DETAILS,
} from '.';

import { UserRoleType } from 'common/types';
import {
  AboutUsPage,
  ChangeEmailPage,
  ChangePasswordPage,
  ConfirmEmailPage,
  ContactSupportPage,
  FAQPage,
  ForgotPasswordPage,
  LastNewsPage,
  PrivacyPolicyPage,
  ProductListPage,
  ResetPasswordPage,
  SellAbraPage,
  TermsAndConditionsPage,
  TutorialPage,
  CheckEmailPage,
  LoginPage,
  RegisterPage,
  MainPage,
  ErrorPage,
  ProductPage,
} from 'pages/general-pages';

type Routes = ReturnType<typeof createBrowserRouter>;

export function createRoutes(userRole: UserRoleType): Routes {
  let child: RouteObject[] = [];

  if (userRole === 'supplier') child = supplierRoutes;
  if (userRole === 'seller') child = sellerRoutes;
  if (userRole === null) child = convertCombinedPrivateRoutes();

  return createBrowserRouter([
    {
      path: HOME,
      errorElement: (
        <main>
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
          path: PRODUCT_DETAILS,
          children: [
            {
              path: ':productId',
              element: <ProductPage />,
            },
          ],
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
          path: PRODUCTS_LIST,
          children: [
            {
              path: ':id',
              element:
                userRole === 'seller' || userRole === null ? (
                  <ProductListPage />
                ) : (
                  <ErrorPage />
                ),
            },
          ],
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
