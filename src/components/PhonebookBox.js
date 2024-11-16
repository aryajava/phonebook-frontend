import React, { useEffect, useState } from 'react';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';
import { PhonebookDelete } from './PhonebookDelete';
import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://localhost:3001/api/phonebooks/',
  timeout: 1000,
});

export const PhonebookBox = () => {
  const [phonebookItems, setPhonebookItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get();
        setPhonebookItems(response.data.phonebooks);
      } catch (error) {
        console.error(error.code);
      }
    }
    fetchData();
  }, []);

  const updatePhonebookItem = (id, updatedItem) => {
    setPhonebookItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const removePhonebookItem = (id) => {
    setPhonebookItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  return (
    <>
      <PhonebookTopBar />
      <PhonebookList
        phonebookItems={phonebookItems}
        updatePhonebookItem={updatePhonebookItem}
        removePhonebookItem={removePhonebookItem}
      />
      <PhonebookDelete />
    </>
  );
};