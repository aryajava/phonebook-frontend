import React, { useEffect } from 'react';
import { ContactItem } from './ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsAsync } from './phonebookSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const page = useSelector((state) => state.phonebook.page);
  const keyword = useSelector((state) => state.phonebook.searchKeyword);
  const sort = useSelector((state) => state.phonebook.sortOrder);

  useEffect(() => {
    dispatch(getContactsAsync({ page, keyword, sort }));
  }, [dispatch, page, keyword, sort]);

  return (
    <>
      <div className='list'>
        {Array.isArray(contacts) ? (
          contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        ) : (
          <p>Loading contacts...</p>
        )}
      </div >
    </>
  );
};