import React from 'react'
import MainPage from '../components/pages/MainPage'
import ProductPage from '../components/pages/ProductPage'
import ProductListPage from '../components/pages/ProductListPage'
import UserAccountPage from '../components/pages/SellerAccountPage'
import OrderHistoryPage from '../components/pages/OrderHistoryPage'
import OrderDetailsPage from '../components/pages/OrderDetailsPage'
import CheckoutPage from '../components/pages/CheckoutPage/CheckoutPage'

const sellerRoute = [
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: 'product',
    element: <ProductPage />
  },
  {
    path: 'product-list',
    element: <ProductListPage />
  },
  {
    path: 'personal-account',
    element: <UserAccountPage />
  },
  {
    path: 'cart',
    element: <CheckoutPage />
  },
  {
    path: 'order-history',
    element: <OrderHistoryPage />
  },
  {
    path: 'order-history/4784437395989684',
    element: <OrderDetailsPage />
  },
  {
    path: 'help',
    element: <p> Help </p>
  }
]

export default sellerRoute
