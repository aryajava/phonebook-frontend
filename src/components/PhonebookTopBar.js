import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowDownAZ, faArrowUpAZ, faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

export const PhonebookTopBar = ({ setSearchKeyword, setSortOrder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrderState] = useState('asc');

  const handleFormAdd = (e) => {
    e.preventDefault();
    window.location.href = '/add';
  };

  const handleSortClick = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    setSortOrderState((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const debouncedSearch = useCallback(debounce((value) => setSearchKeyword(value), 300), [setSearchKeyword]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className='nav sticky-top justify-content-between'>
      <button className='btn btn-brown p-3 mr-3' id='sortPhonebook' onClick={handleSortClick}>
        <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowDownAZ : faArrowUpAZ} />
      </button>
      <div className='flex-fill'>
        <div className='input-group'>
          <span className='input-group-text'>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type='text'
            className='form-control'
            id='searchPhonebook'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <button type='button' onClick={handleFormAdd} className='btn btn-brown p-3 ml-3'>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div>
  );
};