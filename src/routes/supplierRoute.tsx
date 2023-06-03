import React from 'react';

import {
  AccountSetupPage,
  AnalyticsPage,
  BusinessProfilePage,
  DashboardPage,
  FeedbackAndQuestionsPage,
  OrdersPage,
  PriceManagementPage,
  ProductListRegistrationPage,
  ProductsListPage,
  SupplierAccountMainPage,
  SupplierPage,
} from '../pages/supplier-pages';

export const supplierRoute = [
  {
    path: '/',
    element: <SupplierPage />,
    children: [
      {
        path: '/',
        element: <SupplierAccountMainPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'products-list',
        element: <ProductsListPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'price',
        element: <PriceManagementPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'feedback',
        element: <FeedbackAndQuestionsPage />,
      },
    ],
  },
  {
    path: 'account-setup',
    element: <AccountSetupPage />,
  },
  {
    path: 'business-profile',
    element: <BusinessProfilePage />,
  },
  {
    path: 'add-product',
    element: <ProductListRegistrationPage />,
  },
];
