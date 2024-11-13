import React from 'react';

export const PhonebookItem = ({ avatar, name, phone }) => {
  return (
    <div className='card'>
      <div className='phonebook-item__avatar'>
        <img src={avatar} alt={name} />
      </div>
      <div className='phonebook-item__name'>{name}</div>
      <div className='phonebook-item__phone'>{phone}</div>
      <div className='phonebook-item__actions'>
        <button className='btn btn-brown'>Edit</button>
        <button className='btn btn-brown'>Delete</button>
      </div>
    </div>
  );
};