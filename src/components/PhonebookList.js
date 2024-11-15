import React from 'react';
import { PhonebookItem } from './PhonebookItem';

export const PhonebookList = ({ phonebooks = [] }) => {
  const list = phonebooks.map((phonebook) => (
    <PhonebookItem
      key={phonebook.id}
      id={phonebook.id}
      avatar={phonebook.avatar}
      name={phonebook.name}
      phone={phonebook.phone}
    />
  ));

  return (
    <div className='row justify-content-center'>
      {list}
    </div>
  );
}