import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAppDispatch } from '../store/hooks';
import { checkAuth } from '../store/reducers/loginSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
