import React, { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import Loader from '../components/Loader';
import { createRoutes } from '../routes/root';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuth } from '../store/reducers/loginSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector(state => state.app);
  const userRole = useAppSelector(state => state.login.userRole);

  useEffect(() => {
    dispatch(checkAuth());
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
