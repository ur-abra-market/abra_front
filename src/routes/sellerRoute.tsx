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
  PRODUCT_DETAILS,
  SELLER_PRODUCTS,
} from './constans/seller';

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

export const sellerRoute: RouteObject[] = [
  {
    path: SELLER_PRODUCTS,
    element: <ProductListPage />,
  },
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
