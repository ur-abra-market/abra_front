import React from 'react';

import { RouterProvider } from 'react-router-dom';

import routes from './routes/root';

const App = (): JSX.Element => {
  return <RouterProvider router={routes} />;
};

export default App;
