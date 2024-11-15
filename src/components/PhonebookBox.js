import React, { useEffect, useState } from 'react';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';
import { PhonebookDelete } from './PhonebookDelete';
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
});

export const PhonebookBox = () => {
  const [phonebookItems, setPhonebookItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get('api/phonebooks');
        setPhonebookItems(response.data.phonebooks);
      } catch (error) {
        console.error(error.code);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <PhonebookTopBar />
      <PhonebookList phonebooks={phonebookItems} />
      <PhonebookDelete />
    </>
  );
}