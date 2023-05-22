import React from 'react';

import { CheckoutSuccess } from '../old-components/ui/checkout/CheckoutSuccess/CheckoutSuccess';
import CartPage from '../pages/sellerPages/CartPage';
import CheckoutPage from '../pages/sellerPages/CheckoutPage/CheckoutPage';
import OrderDetailsPage from '../pages/sellerPages/OrderDetailsPage';
import OrderHistoryPage from '../pages/sellerPages/OrderHistoryPage';
import ProductPage from '../pages/sellerPages/ProductPage';
import { SellerAccountPage } from '../pages/sellerPages/SellerAccountPage';
import SellerFavoritesList from '../pages/sellerPages/SellerFavoritesList/SellerFavoritesList';
import ProductListPage from '../pages/supplierPages/ProductListPage';

import { MainPage } from 'pages/sellerPages';

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
    element: <CheckoutSuccess />,
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
