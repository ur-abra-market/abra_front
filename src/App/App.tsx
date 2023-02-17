import React from 'react';

import { Outlet } from 'react-router-dom';

import Loader from '../components/Loader';
import { useAppSelector } from '../store/hooks';

const App = (): JSX.Element => {
  const isLoading = useAppSelector(state => state.mainPageProducts.isLoading);

  return (
    <div className="App">
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};

export default App;
