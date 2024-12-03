import React from 'react';
import { PhonebookHeader } from './PhonebookHeader';
import { ContactList } from './ContactList';

export const PhonebookApp = () => {
  return (
    <>
      <PhonebookHeader />
      <ContactList />
    </>
  );
};