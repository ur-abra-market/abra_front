import React from 'react';

import { RouteObject } from 'react-router-dom';

import {
  CHECKOUT_SUCCESS,
  FAVORITES,
  HELP,
  ORDER_HISTORY,
  ORDER_HISTORY_DETAILS,
  PERSONAL_ACCOUNT,
  CART,
} from '.';

import {
  OrderDetailsPage,
  OrderHistoryPage,
  SellerProfilePage,
  SellerFavoritesList,
  CheckoutSuccessPage,
  SellerCartPage,
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
