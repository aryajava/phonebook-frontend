// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage, NotFoundPage } from './components/Error';
import { PhonebookApp } from './features/phonebook/PhonebookApp';
import { AddContact } from './features/phonebook/AddContact';
import './styles/App.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< PhonebookApp />} errorElement={< ErrorPage />} />
          <Route path="/add" element={<AddContact />} errorElement={< ErrorPage />} />
          <Route path="/*" element={<NotFoundPage />} errorElement={< ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;