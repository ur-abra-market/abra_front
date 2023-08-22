import React from 'react';

import { RouteObject } from 'react-router-dom';

import {
  CHECKOUT_SUCCESS,
  FAVORITES,
  HELP,
  ORDER_HISTORY,
  ORDER_HISTORY_DETAILS,
  PERSONAL_ACCOUNT,
  PRODUCT_DETAILS,
} from '.';

import {
  OrderDetailsPage,
  OrderHistoryPage,
  SellerProfilePage,
  SellerFavoritesList,
  CheckoutSuccessPage,
} from 'pages/seller-pages';
import { ProductPage } from 'pages/seller-pages/ProductPage/ProductPage';

export const sellerRoutes: RouteObject[] = [
  {
    path: PRODUCT_DETAILS,
    children: [
      {
        path: ':productId',
        element: <ProductPage />,
      },
    ],
  },
  {
    path: PERSONAL_ACCOUNT,
    element: <SellerProfilePage />,
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
