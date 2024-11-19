import './App.css';
// import { PhonebookBox } from './components/PhonebookBox';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexPhonebook } from './routes/IndexPhonebook';
import { FormPhonebook } from './routes/FormPhonebook';
import ErrorPage from './routes/ErrorPage';
import { PhonebookProvider } from './context/PhonebookContext';

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
  }
);

const App = () => {
  return (
    <PhonebookProvider>
      <RouterProvider router={routes} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
    </PhonebookProvider>
  );
}

export default App;
