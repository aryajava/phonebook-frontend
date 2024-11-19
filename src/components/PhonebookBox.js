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

  const fetchData = async () => {
    dispatch({ type: 'SET_FETCHING', payload: true });
    try {
      const data = await fetchPhonebooks(state.page, state.searchKeyword, state.sortOrder);
      dispatch({
        type: 'SET_ITEMS', payload: {
          items: data.phonebooks,
          hasMore: data.phonebooks.length > 0,
          page: state.page,
        }
      });
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

    observer.current = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (lastPhonebookElementRef.current) {
      observer.current.observe(lastPhonebookElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [state.isFetching, state.hasMore]);

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

  const closeDeleteModal = () => {
    dispatch({
      type: 'CLOSE_DELETE_MODAL',
    });
  };

  const updatePhonebookItem = (id, updatedItem) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id, updatedItem },
    });
  };

  const removePhonebookItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id },
    });
  };

  return (
    <>
      <PhonebookTopBar
        setSearchKeyword={(keyword) => {
          dispatch({ type: 'SET_SEARCH_KEYWORD', payload: keyword });
          dispatch({ type: 'SET_PAGE', payload: 1 });
        }}
        setSortOrder={(order) => {
          dispatch({ type: 'SET_SORT_ORDER', payload: order });
          dispatch({ type: 'SET_PAGE', payload: 1 });
        }}
      />
      <PhonebookList
        phonebookItems={state.phonebookItems}
        updatePhonebookItem={updatePhonebookItem}
        removePhonebookItem={removePhonebookItem}
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
            removePhonebookItem={removePhonebookItem}
            closeDeleteModal={closeDeleteModal}
          />
        )
      }
    </>
  );
};