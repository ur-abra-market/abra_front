import React, { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { useAppDispatch } from '../common/hooks/useAppDispatch';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { createRoutes } from '../routes/root';
import { getUserRole, isAppInitializedSelector } from '../store/reducers/appSlice';
import { userRoleSelector } from '../store/reducers/authSlice';
import { LoaderCircular } from '../ui-kit';

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
      <RouterProvider router={createRoutes(userRole)} />
    </div>
  );
};
