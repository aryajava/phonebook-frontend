import './App.css';
// import { PhonebookBox } from './components/PhonebookBox';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IndexPhonebook } from './routes/IndexPhonebook';
import { FormPhonebook } from './routes/FormPhonebook';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPhonebook />
  },
  {
    path: '/add',
    element: <FormPhonebook />
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
  // reducer
  // state
  return (
    <>
      <RouterProvider router={routes} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
    </>
  );
}

export default App;
