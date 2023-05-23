import React from 'react';

import {
  MainPage,
  CartPage,
  ProductPage,
  CheckoutPage,
  OrderDetailsPage,
  OrderHistoryPage,
  SellerAccountPage,
  SellerFavoritesList,
  ProductListPage,
  CheckoutSuccessPage,
} from 'pages/sellerPages';

export const sellerRoute = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: 'products-list/*',
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
    path: 'checkout-success',
    element: <CheckoutSuccessPage />,
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
    path: 'favorites',
    element: <SellerFavoritesList />,
  },
  {
    path: 'help',
    element: <p> Help </p>,
  },
];
