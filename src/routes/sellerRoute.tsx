import React from 'react';

import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import MainPage from '../pages/MainPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import OrderHistoryPage from '../pages/OrderHistoryPage';
import ProductListPage from '../pages/ProductListPage';
import ProductPage from '../pages/ProductPage';
import SellerAccountPage from '../pages/SellerAccountPage/SellerAccountPage';

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
    element: <SellerAccountPage />,
  },
  {
    path: 'cart',
    element: <CartPage />,
  },
  {
    path: 'checkout',
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
