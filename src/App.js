// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexPhonebook } from './routes/IndexPhonebook';
import { FormPhonebook } from './routes/FormPhonebook';
import ErrorPage from './routes/ErrorPage';
import './styles/App.css';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPhonebook />,
    errorElement: <ErrorPage />
  },
  {
    path: '/add',
    element: <FormPhonebook />,
    errorElement: <ErrorPage />
  },
],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true
    }
  });

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
    </Provider>
  );
};

export default App;