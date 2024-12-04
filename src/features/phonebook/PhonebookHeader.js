import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setSearchKeyword, setSortOrder } from './phonebookSlice';
import { faArrowUpAZ, faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';

export const PhonebookHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchKeyword = useSelector((state) => state.phonebook.searchKeyword);
  const sortOrder = useSelector((state) => state.phonebook.sortOrder);
  const [keyword, setKeyword] = useState(searchKeyword);
  const [sort, setSort] = useState(sortOrder);

  useEffect(() => {
    setKeyword(searchKeyword);
    setSort(sortOrder);
  }, [searchKeyword, sortOrder]);

  const handleSort = (e) => {
    e.preventDefault();
    const newSortOrder = sort === 'asc' ? 'desc' : 'asc';
    setSort(newSortOrder);
    dispatch(setSortOrder(newSortOrder));
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    dispatch(setSearchKeyword(e.target.value));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/add');
  };

  return (
    <nav className='nav-header'>
      <div>
        <button type="button" className="btn-brown" onClick={handleSort}>
          <FontAwesomeIcon icon={sort === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
        </button>
      </div>
      <div className='form-group'>
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input type="text" placeholder="Search..." value={keyword} onChange={handleSearch} />
      </div>
      <div>
        <button type="button" className="btn-brown" onClick={handleAdd}>
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      </div>
    </nav>
  );
};