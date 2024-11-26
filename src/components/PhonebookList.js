import React from 'react';
import { PhonebookItem } from './PhonebookItem';
import { usePhonebookContext } from '../context/PhonebookContext';
export const PhonebookList = () => {
  const { state } = usePhonebookContext();
  return (
    <div className='row justify-content-center' id='phonebookList'>
      {state.phonebookItems.map((item) => (
        <PhonebookItem
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
};