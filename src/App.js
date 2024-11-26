import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPhonebook } from './routes/IndexPhonebook';
import { FormPhonebook } from './routes/FormPhonebook';
import { ErrorPage, NotFoundPage } from './routes/ErrorPage';
import { PhonebookProvider } from './context/PhonebookContext';

const App = () => {
  return (
    <PhonebookProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IndexPhonebook />} errorElement={<ErrorPage />} />
          <Route path='/add' element={<FormPhonebook />} errorElement={<ErrorPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </PhonebookProvider>
  );
}

export default App;
