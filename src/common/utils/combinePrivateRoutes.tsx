import React from 'react';

import { Navigate, RouteObject } from 'react-router-dom';

import { HOME, LOGIN, sellerRoutes, supplierRoutes } from 'routes';

/**
 * Combines private routes from the sellerRoute and supplierRoute arrays
 * and returns an array of private routes that navigate to login page
 */
export const convertCombinedPrivateRoutes = (): RouteObject[] => {
  const navigateToLogin = <Navigate to={LOGIN} />;

  return [
    ...supplierRoutes
      .flatMap(route => (route.children ? route.children : route))
      .map(route => ({
        path: route.path,
        element: navigateToLogin,
      }))
      .filter(route => route.path !== HOME),

    ...sellerRoutes.map(route => ({
      path: route.path,
      element: navigateToLogin,
    })),
  ];
};
