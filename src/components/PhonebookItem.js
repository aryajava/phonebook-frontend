import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const PhonebookItem = ({ avatar, name, phone }) => {
  const avatarWidth = '64';
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-md-6'>
            <div className=''>
              <img src={avatar} alt={name} width={avatarWidth} />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card-item-text'>{name}</div>
            <div className='card-item-text'>{phone}</div>
            <div className='row'>
              <div className='col-6'>
                <button type='button' className='btn btn-card'>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>
              <div className='col-6'>
                <button type='button' className='btn btn-card'>
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