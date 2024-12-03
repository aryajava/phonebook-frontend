import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DeleteContact = (props) => {
  const { show, onClose } = props;

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(`Delete the contact`);
  };

  return (
    <>
      <div className={show ? `modal show` : `modal`}>
        <div className='modal-content'>
          <div className='modal-header'>
            <p>Delete Contact</p>
            <span className='close' onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to delete contact "{"aa"}"?</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn-brown' onClick={handleDelete}>Delete</button>
            <button type='button' className='btn-brown' onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};