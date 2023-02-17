import React from 'react';

import { Outlet } from 'react-router-dom';

import Loader from '../../components/Loader';
// import './Main.css';
import { useAppSelector } from '../../store/hooks';

const Main = (): JSX.Element => {
  const isLoading = useAppSelector(state => state.mainPageProducts.isLoading);

  return (
    <div className="route">
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};

export default Main;
