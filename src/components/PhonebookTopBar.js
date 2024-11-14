import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowDownZA, faSearch } from '@fortawesome/free-solid-svg-icons';

export const PhonebookTopBar = () => {
  const handleFormAdd = (e) => {
    e.preventDefault();
    window.location.href = '/add';
  }
  return (
    <div className='nav sticky-top justify-content-between'>
      <button className='btn btn-brown p-3 mr-3'>
        <FontAwesomeIcon icon={faArrowDownZA} />
      </button>
      <div className='flex-fill'>
        <div className='input-group'>
          <span className='input-group-text'>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input type='text' className='form-control' placeholder='Search...' />
        </div>
      </div>
      <button type='button' onClick={handleFormAdd} className='btn btn-brown p-3 ml-3'>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div >
  );
}