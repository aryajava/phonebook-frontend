import React, { useEffect, useState } from 'react';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';
import { PhonebookDelete } from './PhonebookDelete';
import axios from 'axios';

export const getBaseURL = () => {
  const port = 3001;
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}`;
};

export const request = axios.create({
  baseURL: `${getBaseURL()}/api/phonebooks/`,
  timeout: 1000,
});

export const PhonebookBox = () => {
  const [phonebookItems, setPhonebookItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await request.get();
      setPhonebookItems(response.data.phonebooks);
    } catch (error) {
      console.error(error.code);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const showDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setItemToDelete(null);
    setIsDeleteModalVisible(false);
  };

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
        showDeleteModal={showDeleteModal}
      />
      {isDeleteModalVisible && itemToDelete && (
        <PhonebookDelete
          id={itemToDelete.id}
          name={itemToDelete.name}
          removePhonebookItem={removePhonebookItem}
          closeDeleteModal={closeDeleteModal}
        />
      )}
    </>
  );
};