import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowDownAZ, faArrowUpAZ, faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchKeyword, setSortOrder } from '../features/phonebook/phonebookSlice';

export const PhonebookTopBar = () => {
  const dispatch = useDispatch();
  const { sortOrder, searchKeyword } = useSelector((state) => state.phonebook);
  const navigate = useNavigate();

  const handleFormAdd = (e) => {
    e.preventDefault();
    navigate('/add');
  };

  const handleSortClick = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(setSortOrder(newSortOrder));
  };

  const debouncedSearch = useMemo(
    () => debounce((value) => dispatch(setSearchKeyword(value)), 200),
    [dispatch]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
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
            value={searchKeyword}
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