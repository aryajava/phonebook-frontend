import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faSearch, faSortAlphaDesc, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSearchKeyword, setSortOrder } from './phonebookSlice';

export const PhonebookHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(setSortOrder('desc'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchKeyword(keyword));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/add');
  };

  return (
    <nav className='nav-header'>
      <div>
        <button type="button" className="btn-brown" onClick={handleSort}>
          <FontAwesomeIcon icon={faSortAlphaDesc} />
        </button>
      </div>
      <div className='form-group'>
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input type="text" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <div>
        <button type="button" className="btn-brown" onClick={handleAdd}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>
    </nav>
  );
};