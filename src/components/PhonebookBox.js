import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';
import { usePhonebookContext } from '../context/PhonebookContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchPhonebooks } from '../services/phonebookApi';
import { PhonebookDelete } from './PhonebookDelete';

export const PhonebookBox = () => {
  const { state, dispatch } = usePhonebookContext();
  const observer = useRef();

  const isDuplicate = (newItems) => {
    const existingIds = new Set(state.phonebookItems.map(item => item.id));
    return newItems.some(item => existingIds.has(item.id));
  };

  const fetchData = async () => {
    dispatch({ type: 'SET_FETCHING', payload: true });
    try {
      const data = await fetchPhonebooks(state.page, state.searchKeyword, state.sortOrder);
      if (!isDuplicate(data.phonebooks)) {
        dispatch({
          type: 'SET_ITEMS', payload: {
            items: data.phonebooks,
            hasMore: data.phonebooks.length > 0,
            page: state.page,
          }
        });
      }
    } catch (error) {
      console.error('Error fetching phonebooks:', error.code);
    }
    dispatch({ type: 'SET_FETCHING', payload: false });
  };

  useEffect(() => {
    fetchData();
  }, [state.page, state.searchKeyword, state.sortOrder]);

  const lastPhonebookElementRef = useRef();

  useEffect(() => {
    if (state.isFetching) return;
    if (observer.current) observer.current.disconnect();

    const handleObserver = throttle((entries) => {
      if (entries[0].isIntersecting && state.hasMore) {
        dispatch({ type: 'SET_PAGE', payload: state.page + 1 });
      }
    }, 200);

    observer.current = new IntersectionObserver(handleObserver, { threshold: 0.5, rootMargin: '0px 0px 100px 0px' });
    if (lastPhonebookElementRef.current) {
      observer.current.observe(lastPhonebookElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [state.isFetching, state.hasMore, dispatch, state.page]);

  useEffect(() => {
    dispatch({
      type: 'RESET',
      payload: { keyword: state.searchKeyword, order: state.sortOrder },
    });
  }, [state.searchKeyword, state.sortOrder]);

  const showDeleteModal = (item) => {
    dispatch({
      type: 'SHOW_DELETE_MODAL',
      payload: item,
    });
  };

  return (
    <>
      <PhonebookTopBar />
      <PhonebookList
        phonebookItems={state.phonebookItems}
        showDeleteModal={showDeleteModal}
      />
      {state.isFetching &&
        <div className='row justify-content-center p-3'>
          <FontAwesomeIcon icon={faSpinner} spin size='2x' />
        </div>
      }
      <div ref={lastPhonebookElementRef}></div>
      {
        state.isDeleteModalVisible && state.itemToDelete && (
          <PhonebookDelete
            id={state.itemToDelete.id}
            name={state.itemToDelete.name}
          />
        )
      }
    </>
  );
};