import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuth } from '../store/reducers/loginSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector(state => state.app);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
