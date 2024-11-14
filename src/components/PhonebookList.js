import React from 'react';

export const PhonebookList = ({ children }) => {
  return (
    <div className='row phonebook-list justify-content-center'>
      {children}
    </div>
  );
}