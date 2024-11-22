import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowDownAZ, faArrowUpAZ, faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

export const PhonebookTopBar = ({ setSearchKeyword, setSortOrder }) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchKeyword') || '');
  const [sortOrder, setSortOrderState] = useState(localStorage.getItem('sortOrder') || 'asc');
  const navigate = useNavigate();

  const handleFormAdd = (e) => {
    e.preventDefault();
    navigate('/add');
  };

  const handleSortClick = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortOrderState(newSortOrder);
    localStorage.setItem('sortOrder', newSortOrder);
  };

  const debouncedSearch = useMemo(() => debounce((keyword) => {
    setSearchKeyword(keyword);
    localStorage.setItem('searchKeyword', keyword);
  }, 200), [setSearchKeyword]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className='nav sticky-top justify-content-between'>
      <button className='btn btn-brown p-3 mr-3' id='sortPhonebook' onClick={handleSortClick}>
        <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
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
      <button type='button' onClick={handleFormAdd} className='btn btn-brown p-3 ml-3' id='addPhonebook'>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    </div>
  );
};