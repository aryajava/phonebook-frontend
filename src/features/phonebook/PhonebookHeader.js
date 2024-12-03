import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faSearch, faSortAlphaDesc, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PhonebookHeader = () => {
  const navigate = useNavigate();

  const handleSort = (e) => {
    e.preventDefault();
    console.log(`Sort the contacts`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Search the contacts`);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate('/add');
  };

  return (
    <>
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
          <input type="text" placeholder="Search..." onChange={handleSearch} />
        </div>
        <div>
          <button type="button" className="btn-brown" onClick={handleAdd}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
      </nav>
    </>
  );
};