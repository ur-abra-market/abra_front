import React from 'react';

import { RouteObject } from 'react-router-dom';

import {
  CART,
  CHECKOUT,
  CHECKOUT_SUCCESS,
  FAVORITES,
  HELP,
  ORDER_HISTORY,
  ORDER_HISTORY_DETAILS,
  PERSONAL_ACCOUNT,
  SELLER_PRODUCTS,
} from './constans/seller';

import {
  CartPage,
  ProductPage,
  CheckoutPage,
  OrderDetailsPage,
  OrderHistoryPage,
  SellerAccountPage,
  SellerFavoritesList,
  ProductListPage,
  CheckoutSuccessPage,
} from 'pages/seller-pages';

export const sellerRoute: RouteObject[] = [
  {
    path: SELLER_PRODUCTS,
    element: <ProductListPage />,
  },
  {
    path: 'product',
    // element: <ProductPage />,
    children: [
      {
        path: ':productId',
        element: <ProductPage />,
      },
    ],
  },
  {
    path: PERSONAL_ACCOUNT,
    element: <SellerAccountPage />,
  },
  {
    path: CART,
    element: <CartPage />,
  },
  {
    path: CHECKOUT,
    element: <CheckoutPage />,
  },
  {
    path: CHECKOUT_SUCCESS,
    element: <CheckoutSuccessPage />,
  },
  {
    path: ORDER_HISTORY,
    element: <OrderHistoryPage />,
  },
  {
    path: ORDER_HISTORY_DETAILS,
    element: <OrderDetailsPage />,
  },
  {
    path: FAVORITES,
    element: <SellerFavoritesList />,
  },
  {
    path: HELP,
    element: <p> Help </p>,
  },
];
