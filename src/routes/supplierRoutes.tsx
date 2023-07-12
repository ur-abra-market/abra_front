import React from 'react';

import { RouteObject } from 'react-router-dom';

import {
  ACCOUNT_SETUP_BUSINESS_INFO,
  ACCOUNT_SETUP_PERSONAL_INFO,
  ADD_PRODUCT,
  ANALYTICS,
  DASHBOARD,
  FEEDBACK,
  HOME,
  ORDERS,
  PRICE,
  PRODUCTS,
} from '.';

import { NewSupplierProductsListPage } from 'old-components/NewSupplierProductsListPage/NewSupplierProductsListPage';
import { SupplierProductsListPage } from 'old-components/SupplierProductsListPage/SupplierProductsListPage';
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
        path: PRODUCTS,
        element: <NewSupplierProductsListPage />,
        // element: <SupplierProductsListPage />,
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
