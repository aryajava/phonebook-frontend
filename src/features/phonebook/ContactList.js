import React, { useEffect, useRef, useCallback } from 'react';
import { ContactItem } from './ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsAsync, setPage } from './phonebookSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const page = useSelector((state) => state.phonebook.page);
  const keyword = useSelector((state) => state.phonebook.searchKeyword);
  const sort = useSelector((state) => state.phonebook.sortOrder);
  const status = useSelector((state) => state.phonebook.status);
  const hasMore = useSelector((state) => state.phonebook.hasMore);
  const observerTarget = useRef(null);

  useEffect(() => {
    console.log('useEffect triggered with:', { page, keyword, sort });
    dispatch(getContactsAsync({ page, keyword, sort }));
  }, [dispatch, page, keyword, sort]);

  // Intersection Observer Callback
  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && status === 'idle' && hasMore) {
        // Fetch the next page
        dispatch(setPage(page + 1));
      }
    },
    [dispatch, page, status, hasMore]
  );

  // Setting up Intersection Observer
  useEffect(() => {
    const target = observerTarget.current; // Salin nilai ref ke variabel lokal
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target); // Gunakan variabel lokal untuk cleanup
    };
  }, [observerCallback]);


  return (
    <>
      <div className="list">
        {Array.isArray(contacts) ? (
          contacts.map((contact, index) => (
            // Gunakan kombinasi unik untuk key, misalnya id + index
            <ContactItem key={`${contact.id}-${index}`} contact={contact} />
          ))
        ) : (
          <p>Loading contacts...</p>
        )}
        {/* Observer Target */}
        <div ref={observerTarget} style={{ height: '1px' }} />
      </div>
    </>
  );

};
