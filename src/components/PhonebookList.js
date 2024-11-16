import React from 'react';
import { PhonebookItem } from './PhonebookItem';

export const PhonebookList = ({ phonebookItems, updatePhonebookItem, removePhonebookItem }) => {
  return (
    <div className='row justify-content-center'>
      {phonebookItems.map((item) => (
        <PhonebookItem
          key={item.id}
          {...item}
          updatePhonebookItem={updatePhonebookItem}
          removePhonebookItem={removePhonebookItem}
        />
      ))}
    </div>
  );
};
