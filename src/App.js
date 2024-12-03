import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage, NotFoundPage } from './components/ErrorPage';
import { PhonebookProvider } from './context/PhonebookContext';
import { PhonebookBox } from './components/phonebook/PhonebookBox';
import { PhonebookAdd } from './components/phonebook/PhonebookAdd';

const App = () => {
  return (
    <PhonebookProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PhonebookBox />} errorElement={<ErrorPage />} />
          <Route path='/add' element={<PhonebookAdd />} errorElement={<ErrorPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </PhonebookProvider>
  );
}

export default App;
