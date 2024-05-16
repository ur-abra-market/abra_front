import React from 'react';

import { RouteObject } from 'react-router-dom';

import { CHECKOUT_ERROR } from './path-constants/seller';

import {
  CART,
  CHECKOUT_SUCCESS,
  FAVORITES,
  HELP,
  ORDER_HISTORY,
  ORDER_HISTORY_DETAILS,
  PERSONAL_ACCOUNT,
} from '.';

import {
  CheckoutErrorPage,
  CheckoutSuccessPage,
  OrderDetailsPage,
  OrderHistoryPage,
  SellerCartPage,
  SellerFavoritesList,
  SellerProfilePage,
} from 'pages/seller-pages';

export const sellerRoutes: RouteObject[] = [
  {
    path: PERSONAL_ACCOUNT,
    element: <SellerProfilePage />,
  },
  {
    path: CHECKOUT_SUCCESS,
    element: <CheckoutSuccessPage />,
  },
  {
    path: CHECKOUT_ERROR,
    element: <CheckoutErrorPage />,
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
    path: CART,
    element: <SellerCartPage />,
  },
  {
    path: HELP,
    element: <p> Help </p>,
  },
];
