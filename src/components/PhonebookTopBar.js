import React from 'react';

export const PhonebookTopBar = () => {
  return (
    <div className='row nav nav-top'>
      <div className='col-4 btn-sort'>
        <button className='btn btn-brown'>Sort</button>
      </div>
      <div className='col-4 search'>
        <input type='text' placeholder='Search' />
      </div>
      <div className='col-4 btn-add'>
        <button className='btn btn-brown'>Add</button>
      </div>
    </div>
  );
}