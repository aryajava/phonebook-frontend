import React from 'react';
import { PhonebookItem } from './PhonebookItem';

export const PhonebookList = ({ phonebookItems = [], showDeleteModal }) => {
  return (
    <div className='row justify-content-center' id='phonebookList'>
      {phonebookItems.map((item) => (
        <PhonebookItem
          key={item.id}
          {...item}
          showDeleteModal={showDeleteModal}
        />
      ))}
    </div>
  );
};