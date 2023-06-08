import React from 'react';

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
} from '../pages/supplier-pages';

export const supplierRoute = [
  {
    path: '/',
    element: <SupplierMainPage />,
    children: [
      {
        path: '/',
        element: <SupplierProfilePage />,
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
    path: 'account-setup-personal-info',
    element: <AccountSetupPersonalInfoPage />,
  },
  {
    path: 'account-setup-business-info',
    element: <AccountSetupBusinessInfoPage />,
  },
  {
    path: 'add-product',
    element: <ProductListRegistrationPage />,
  },
];
