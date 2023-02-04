import React from 'react';

import './App.css';
import { RouterProvider } from 'react-router-dom';

import routes from './routes/root';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
