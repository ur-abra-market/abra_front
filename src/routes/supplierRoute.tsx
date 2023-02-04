import React from 'react';

import AccountSetupPage from '../pages/AccountSetupPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import BusinessProfilePage from '../pages/BusinessProfilePage';
import DashboardPage from '../pages/DashboardPage';
import FeedbackAndQuestionsPage from '../pages/FeedbackAndQuestionsPage';
import OrdersPage from '../pages/OrdersPage';
import PriceManagementPage from '../pages/PriceManagementPage';
import ProductListRegistrationPage from '../pages/ProductListRegistrationPage';
import ProductsListPage from '../pages/ProductsListPage';
import SupplierAccountPage from '../pages/SupplierAccountMainPage';
import SupplierPage from '../pages/SupplierPage';

const supplierRoute = [
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

export default supplierRoute;
