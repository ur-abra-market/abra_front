import React, { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../common/hooks';
import { LoadingStatus } from '../common/types';
import { createRoutes } from '../routes/root';
import { getCurrentUserInfo } from '../store/reducers/loginSlice';
import { LoaderCircular } from '../ui-kit';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const isLoading = useAppSelector(state => state.app.isLoading);
  const userRole = useAppSelector(state => state.login.userRole);

  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, []);

  if (!isInitialized || isLoading === LoadingStatus.Loading) {
    return <LoaderCircular />;
  }

  return (
    <div className="App">
      <RouterProvider router={createRoutes(userRole)} />
    </div>
  );
};
