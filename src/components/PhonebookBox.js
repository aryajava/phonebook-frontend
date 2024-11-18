import React, { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash';
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
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchData = async (page) => {
    setIsFetching(true);
    try {
      const response = await request.get(`?page=${page}`);
      setPhonebookItems((prevItems) => {
        const newItems = response.data.phonebooks.filter(
          (newItem) => !prevItems.some((item) => item.id === newItem.id)
        );
        return [...prevItems, ...newItems];
      });
      setHasMore(response.data.phonebooks.length > 0);
    } catch (error) {
      console.error(error.code);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const lastPhonebookElementRef = useRef();

  useEffect(() => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    const handleObserver = throttle((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 200); // 200ms throttle delay

    observer.current = new IntersectionObserver(handleObserver);
    if (lastPhonebookElementRef.current) {
      observer.current.observe(lastPhonebookElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isFetching, hasMore]);

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
      {isFetching}
      <div ref={lastPhonebookElementRef}></div>
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