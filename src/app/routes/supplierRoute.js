import React from 'react'
import SupplierPage from '../components/pages/SupplierPage'
import SupplierAccountPage from '../components/pages/SupplierAccountMainPage'
import DashboardPage from '../components/pages/DashboardPage'
import ProductsListPage from '../components/pages/ProductsListPage'
import OrdersPage from '../components/pages/OrdersPage'
import PriceManagementPage from '../components/pages/PriceManagementPage'
import AnalyticsPage from '../components/pages/AnalyticsPage'
import FeedbackAndQuestionsPage from '../components/pages/FeedbackAndQuestionsPage'
import AccountSetupPage from '../components/pages/AccountSetupPage'
import BusinessProfilePage from '../components/pages/BusinessProfilePage'
import ProductListRegistrationPage from '../components/pages/ProductListRegistrationPage'

const supplierRoute = [
  {
    path: '/',
    element: <SupplierPage />,
    children: [
      {
        path: '/',
        element: <SupplierAccountPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'products-list',
        element: <ProductsListPage />
      },
      {
        path: 'orders',
        element: <OrdersPage />
      },
      {
        path: 'price',
        element: <PriceManagementPage />
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />
      },
      {
        path: 'feedback',
        element: <FeedbackAndQuestionsPage />
      }
    ]
  },
  {
    path: 'account-setup',
    element: <AccountSetupPage />
  },
  {
    path: 'business-profile',
    element: <BusinessProfilePage />
  },
  {
    path: 'add-product',
    element: <ProductListRegistrationPage />
  }
]
export default supplierRoute
