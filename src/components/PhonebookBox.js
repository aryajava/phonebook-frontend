import React, { useEffect, useState, useRef } from 'react';
import { throttle } from 'lodash';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';
import { PhonebookDelete } from './PhonebookDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { request } from '../services/phonebookApi';

export const PhonebookBox = () => {
  const [phonebookItems, setPhonebookItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem('searchKeyword') || '');
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
  const observer = useRef();

  const fetchData = async (page, searchKeyword, sortOrder) => {
    setIsFetching(true);
    try {
      const response = await request.get(`?page=${page}&keyword=${searchKeyword}&sort=${sortOrder}`);
      setPhonebookItems((prevItems) => {
        const newItems = response.data.phonebooks.filter(
          (newItem) => !prevItems.some((item) => item.id === newItem.id)
        );
        return [...prevItems, ...newItems];
      });
      setHasMore(response.data.phonebooks.length > 0);
    } catch (error) {
      console.error(error.message);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    setPage(1);
    setPhonebookItems([]);
    if (!searchKeyword && sortOrder === 'asc') localStorage.clear();
  }, [searchKeyword, sortOrder]);

  useEffect(() => {
    Promise.resolve().then(() => fetchData(page, searchKeyword, sortOrder));
  }, [page, searchKeyword, sortOrder]);

  const lastPhonebookElementRef = useRef();

  useEffect(() => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    const handleObserver = throttle((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }, 500);

    observer.current = new IntersectionObserver(handleObserver, { threshold: 1, rootMargin: '0px 0px 100px 0px' });
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

  const updatePhonebookItem = async (id, updatedItem) => {
    setPhonebookItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item))
    );
    setPage(1);
    setPhonebookItems([]);
    await fetchData(page, searchKeyword, sortOrder);
  };

  const removePhonebookItem = (id) => {
    setPhonebookItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <PhonebookTopBar
        setSearchKeyword={(keyword) => {
          setSearchKeyword(keyword);
          setPage(1);
        }}
        setSortOrder={(order) => {
          setSortOrder(order);
          setPage(1);
        }}
      />
      <PhonebookList
        phonebookItems={phonebookItems}
        updatePhonebookItem={updatePhonebookItem}
        removePhonebookItem={removePhonebookItem}
        showDeleteModal={showDeleteModal}
      />
      {isFetching &&
        <div className='loading'>
          <FontAwesomeIcon icon={faSpinner} spin size='2x' />
        </div>
      }
      <div ref={lastPhonebookElementRef}></div>
      {
        isDeleteModalVisible && itemToDelete && (
          <PhonebookDelete
            id={itemToDelete.id}
            name={itemToDelete.name}
            removePhonebookItem={removePhonebookItem}
            closeDeleteModal={closeDeleteModal}
          />
        )
      }
    </>
  );
};