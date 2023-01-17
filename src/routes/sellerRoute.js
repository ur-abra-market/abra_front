import React from 'react';

import CheckoutPage from '../components/pages/CheckoutPage/CheckoutPage';
import MainPage from '../components/pages/MainPage';
import OrderDetailsPage from '../components/pages/OrderDetailsPage';
import OrderHistoryPage from '../components/pages/OrderHistoryPage';
import ProductListPage from '../components/pages/ProductListPage';
import ProductPage from '../components/pages/ProductPage';
import UserAccountPage from '../components/pages/SellerAccountPage';

const sellerRoute = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'products-list',
    element: <ProductListPage />,
  },
  {
    path: 'product/:productId',
    element: <ProductPage />,
  },
  {
    path: 'personal-account',
    element: <UserAccountPage />,
  },
  {
    path: 'cart',
    element: <CheckoutPage />,
  },
  {
    path: 'order-history',
    element: <OrderHistoryPage />,
  },
  {
    path: 'order-history/4784437395989684',
    element: <OrderDetailsPage />,
  },
  {
    path: 'help',
    element: <p> Help </p>,
  },
];

export default sellerRoute;
