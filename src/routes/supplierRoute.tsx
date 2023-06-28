import React from 'react';

import { RouteObject } from 'react-router-dom';

import { HOME } from './constans/root';
import {
  ACCOUNT_SETUP_BUSINESS_INFO,
  ACCOUNT_SETUP_PERSONAL_INFO,
  ADD_PRODUCT,
  ANALYTICS,
  DASHBOARD,
  FEEDBACK,
  ORDERS,
  PRICE,
  SUPPLIERS_PRODUCTS,
} from './constans/supplier';

import {
  AccountSetupBusinessInfoPage,
  AccountSetupPersonalInfoPage,
  AnalyticsPage,
  DashboardPage,
  FeedbackAndQuestionsPage,
  OrdersPage,
  PriceManagementPage,
  ProductListRegistrationPage,
  ProductsListPage,
  SupplierMainPage,
  SupplierProfilePage,
} from 'pages/supplier-pages';

export const supplierRoute: RouteObject[] = [
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
        path: SUPPLIERS_PRODUCTS,
        element: <ProductsListPage />,
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
