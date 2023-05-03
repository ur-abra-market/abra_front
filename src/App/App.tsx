import React, { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import Loader from '../components/Loader';
import { createRoutes } from '../routes/root';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentUserInfo } from '../store/reducers/loginSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const userRole = useAppSelector(state => state.login.userRole);

  useEffect(() => {
    dispatch(getCurrentUserInfo());
  }, [dispatch]);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <div className="App">
      <RouterProvider router={createRoutes(userRole)} />
    </div>
  );
};

export default App;
