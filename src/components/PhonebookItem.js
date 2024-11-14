import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const PhonebookItem = ({ avatar, name, phone }) => {
  const avatarWidth = '64';
  return (
    <div className='col-xl-3 col-md-4 col-12'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-4 p-1 justify-content-center'>
              <img src={avatar} alt={name} width={avatarWidth} />
            </div>
            <div className='col-8 p-1'>
              <p className='card-item-text'>{name}</p>
              <p className='card-item-text'>{phone}</p>
              <div className='row'>
                <button type='button' className=' m-0 p-0 btn btn-card p-2'>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button type='button' className=' m-0 p-0 btn btn-card p-2'>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};