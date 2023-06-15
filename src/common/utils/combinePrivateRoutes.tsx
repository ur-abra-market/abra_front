import React from 'react';

import { Navigate, RouteObject } from 'react-router-dom';

import { sellerRoute } from '../../routes/sellerRoute';
import { supplierRoute } from '../../routes/supplierRoute';

/**
 * Combines private routes from the sellerRoute and supplierRoute arrays
 * and returns an array of private routes that navigate to login page
 */
export const combinePrivateRoutes = (): RouteObject[] => {
  const navigateToLogin = <Navigate to="/login" />;

  return [
    ...sellerRoute.map(route => ({
      path: route.path,
      element: navigateToLogin,
    })),
    ...supplierRoute
      .flatMap(route => (route.children ? route.children : route))
      .map(route => ({
        path: route.path,
        element: navigateToLogin,
      }))
      .filter(route => route.path !== '/'),
  ];
};
