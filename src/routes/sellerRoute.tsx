import React from 'react';

import {
  CartPage,
  ProductPage,
  CheckoutPage,
  OrderDetailsPage,
  OrderHistoryPage,
  SellerProfilePage,
  SellerFavoritesList,
  ProductListPage,
  CheckoutSuccessPage,
} from 'pages/seller-pages';

export const sellerRoute = [
  {
    path: 'products_list/*',
    element: <ProductListPage />,
  },
  {
    path: 'product/:productId',
    element: <ProductPage />,
  },
  {
    path: 'personal_account',
    element: <SellerProfilePage />,
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
    path: 'checkout_success',
    element: <CheckoutSuccessPage />,
  },
  {
    path: 'order_history',
    element: <OrderHistoryPage />,
  },
  {
    path: 'order_history/4784437395989684',
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
