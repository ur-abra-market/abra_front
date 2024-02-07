import React from 'react';

import { RouteObject } from 'react-router-dom';

import {
  ADD_PRODUCT,
  ACCOUNT_SETUP_BUSINESS_INFO,
  ACCOUNT_SETUP_PERSONAL_INFO,
  ANALYTICS,
  DASHBOARD,
  FEEDBACK,
  HOME,
  ORDERS,
  PRICE,
  PRODUCTS,
} from '.';

import {
  AccountSetupBusinessInfoPage,
  AccountSetupPersonalInfoPage,
  AnalyticsPage,
  DashboardPage,
  FeedbackAndQuestionsPage,
  OrdersPage,
  PriceManagementPage,
  SupplierMainPage,
  SupplierProfilePage,
} from 'pages/supplier-pages';
import { NewProductForm } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/NewProductForm';
import { SupplierProducts } from 'pages/supplier-pages/pages/SupplierProducts/SupplierProducts';

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
        element: <SupplierProducts />,
      },
      {
        path: ADD_PRODUCT,
        element: <NewProductForm />,
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
];
