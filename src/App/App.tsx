import React, { Suspense, useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { NoticePopup } from 'elements';
import { createRoutes } from 'routes';
import { getUserRole, isAppInitializedSelector } from 'store/reducers/appSlice';
import { userRoleSelector } from 'store/reducers/authSlice';
import { LoaderCircular, LoaderLinear } from 'ui-kit';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isAppInitialized = useAppSelector(isAppInitializedSelector);
  const userRole = useAppSelector(userRoleSelector);

  useEffect(() => {
    dispatch(getUserRole());
  }, []);

  if (!isAppInitialized) {
    return <LoaderCircular />;
  }

  return (
    <div className="App">
      <NoticePopup />
      <Suspense fallback={<LoaderLinear />}>
        <RouterProvider router={createRoutes(userRole)} />
      </Suspense>
    </div>
  );
};
