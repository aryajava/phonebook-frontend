import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowDownZA, faSearch } from '@fortawesome/free-solid-svg-icons';

export const PhonebookTopBar = () => {
  return (
    <div className='row nav nav-top'>
      <div className='col-md-1 btn-sort justify-content-end'>
        <button className='btn btn-brown'>
          <FontAwesomeIcon icon={faArrowDownZA} />
        </button>
      </div>
      <div className='col-md-10'>
        <div className='input-group'>
          <span className='input-group-text'>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input type='text' className='form-control' placeholder='Search...' />
        </div>
      </div>
      <div className='col-md-1 btn-add justify-content-start'>
        <button className='btn btn-brown'>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div >
    </div >
  );
}