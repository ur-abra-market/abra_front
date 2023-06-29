import React from 'react';

import { RouteObject } from 'react-router-dom';

import {
  ACCOUNT_SETUP_BUSINESS_INFO,
  ACCOUNT_SETUP_PERSONAL_INFO,
  ADD_PRODUCT,
  ANALYTICS,
  DASHBOARD,
  FEEDBACK,
  ORDERS,
  PRICE,
  HOME,
} from '.';

import {
  AccountSetupBusinessInfoPage,
  AccountSetupPersonalInfoPage,
  AnalyticsPage,
  DashboardPage,
  FeedbackAndQuestionsPage,
  OrdersPage,
  PriceManagementPage,
  ProductListRegistrationPage,
  SupplierMainPage,
  SupplierProfilePage,
} from 'pages/supplier-pages';

export const supplierRoutes: RouteObject[] = [
  {
    path: HOME,
    element: <SupplierMainPage />,
    children: [
      {
        path: HOME,
        element: <SupplierProfilePage />,
      },
      {
        path: DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ORDERS,
        element: <OrdersPage />,
      },
      {
        path: PRICE,
        element: <PriceManagementPage />,
      },
      {
        path: ANALYTICS,
        element: <AnalyticsPage />,
      },
      {
        path: FEEDBACK,
        element: <FeedbackAndQuestionsPage />,
      },
    ],
  },
  {
    path: ACCOUNT_SETUP_PERSONAL_INFO,
    element: <AccountSetupPersonalInfoPage />,
  },
  {
    path: ACCOUNT_SETUP_BUSINESS_INFO,
    element: <AccountSetupBusinessInfoPage />,
  },
  {
    path: ADD_PRODUCT,
    element: <ProductListRegistrationPage />,
  },
];
