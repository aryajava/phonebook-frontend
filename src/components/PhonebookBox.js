import React, { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { PhonebookList } from './PhonebookList';
import { PhonebookTopBar } from './PhonebookTopBar';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchPhonebookItems } from '../features/phonebook/phonebookThunks';
import { setPage, showDeleteModal, reset } from '../features/phonebook/phonebookSlice';
import { PhonebookDelete } from './PhonebookDelete';

export const PhonebookBox = () => {
  const dispatch = useDispatch();
  const {
    phonebookItems,
    isFetching,
    searchKeyword,
    sortOrder,
    page,
    isDeleteModalVisible,
    itemToDelete,
  } = useSelector((state) => state.phonebook);

  const [hasMore, setHasMore] = useState(true);
  const fetchingPage = useRef(null);
  const observer = useRef();
  const lastPhonebookElementRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (isFetching || fetchingPage.current === page) return;
      fetchingPage.current = page;
      const moreItems = await dispatch(fetchPhonebookItems({ page, keyword: searchKeyword, sort: sortOrder })).unwrap();
      setHasMore(moreItems);
    };
    fetchData();
  }, [dispatch, page, searchKeyword, sortOrder, isFetching]);


  useEffect(() => {
    if (isFetching) return;
    if (observer.current) observer.current.disconnect();

    const handleObserver = throttle((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(setPage(page + 1));
      }
    }, 500);

    observer.current = new IntersectionObserver(handleObserver, { threshold: 1, rootMargin: '0px 0px 100px 0px' });
    if (lastPhonebookElementRef.current) {
      observer.current.observe(lastPhonebookElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isFetching, hasMore, dispatch, page]);

  useEffect(() => {
    // dispatch(reset({ keyword: searchKeyword, order: sortOrder }));
    fetchingPage.current = null;
    dispatch(setPage(1));
  }, [dispatch, searchKeyword, sortOrder]);

  const showDeleteModalHandler = (item) => {
    dispatch(showDeleteModal(item));
  };

  return (
    <>
      <PhonebookTopBar />
      <PhonebookList
        phonebookItems={phonebookItems}
        showDeleteModal={showDeleteModalHandler}
      />
      {isFetching &&
        <div className='row justify-content-center p-3'>
          <FontAwesomeIcon icon={faSpinner} spin size='2x' />
        </div>
      }
      <div ref={lastPhonebookElementRef}></div>
      {
        isDeleteModalVisible && itemToDelete && (
          <PhonebookDelete
            id={itemToDelete.id}
            name={itemToDelete.name}
          />
        )
      }
    </>
  );
};
