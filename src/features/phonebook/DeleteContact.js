import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DeleteContact = ({ show, onClose, onDelete, data }) => {

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete();
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
            <p>Are you sure you want to delete this contact?</p>
            <div className='contact-info'>
              <div className='avatar'>
                <img src={data.avatar} alt={data.name} />
              </div>
              <div className='contact-detail'>
                <p>Name: {data.name}</p>
                <p>Phone: {data.phone}</p>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn-brown' onClick={handleClose}>Cancel</button>
            <button type='button' className='btn-brown' onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};