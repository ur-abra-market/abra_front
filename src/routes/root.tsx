import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AboutUsPage from '../pages/commonPages/AboutUsPage/AboutUsPage';
import AuthPage from '../pages/commonPages/AuthPage';
import ChangeEmailPage from '../pages/commonPages/ChangeEmailPage';
import ChangePasswordPage from '../pages/commonPages/ChangePasswordPage';
import CheckEmailPage from '../pages/commonPages/CheckEmailPage/CheckEmailPage';
import ConfirmEmailPage from '../pages/commonPages/ConfirmEmailPage';
import { ContactSupportPage } from '../pages/commonPages/ContactSupportPage/ContactSupportPage';
import ErrorPage from '../pages/commonPages/ErrorPage/ErrorPage';
import FAQPage from '../pages/commonPages/FAQPage/FAQPage';
import ForgotPasswordPage from '../pages/commonPages/ForgotPasswordPage';
import LastNewsPage from '../pages/commonPages/LastNewsPage/LastNewsPage';
import ResetPasswordPage from '../pages/commonPages/ResetPasswordPage';
import { SellAbraPage } from '../pages/commonPages/SellAbraPage/SellAbra';
import { TermsAndConditionsPage } from '../pages/commonPages/TermsAndConditionsPage/TermsAndConditionsPage';
import TutorialPage from '../pages/commonPages/TutorialPage/TutorialPage';
import { userRoleType } from '../services/auth.serviceType';

import { sellerRoute } from './sellerRoute';
import { supplierRoute } from './supplierRoute';

import { PrivacyPolicyPage } from 'pages/commonPages/PrivacyPolicyPage/PrivacyPolicyPage';

type Routes = ReturnType<typeof createBrowserRouter>;

export function createRoutes(userRole: userRoleType): Routes {
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
