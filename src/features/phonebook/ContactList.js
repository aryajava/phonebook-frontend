import React, { useEffect } from 'react';
import { ContactItem } from './ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { getPhonebooksAsync } from './phonebookThunks';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.phonebook.contacts);
  const page = useSelector((state) => state.phonebook.page);

  useEffect(() => {
    dispatch(getPhonebooksAsync({ page }));
  }, [dispatch, page]);

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
      </div>
    </>
  );
};