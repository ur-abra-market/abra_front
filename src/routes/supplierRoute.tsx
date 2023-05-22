import React from 'react';

import AccountSetupPage from '../pages/supplierPages/AccountSetupPage';
import AnalyticsPage from '../pages/supplierPages/AnalyticsPage';
import BusinessProfilePage from '../pages/supplierPages/BusinessProfilePage';
import DashboardPage from '../pages/supplierPages/DashboardPage';
import FeedbackAndQuestionsPage from '../pages/supplierPages/FeedbackAndQuestionsPage';
import OrdersPage from '../pages/supplierPages/OrdersPage';
import PriceManagementPage from '../pages/supplierPages/PriceManagementPage';
import ProductListRegistrationPage from '../pages/supplierPages/ProductListRegistrationPage';
import ProductsListPage from '../pages/supplierPages/ProductsListPage';
import SupplierAccountPage from '../pages/supplierPages/SupplierAccountMainPage';
import SupplierPage from '../pages/supplierPages/SupplierPage';

export const supplierRoute = [
  {
    path: '/',
    element: <SupplierPage />,
    children: [
      {
        path: '/',
        element: <SupplierAccountPage />,
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
