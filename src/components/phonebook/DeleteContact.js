import React from 'react';

export const DeleteContact = (props) => {
  console.log(`DeleteContact props:`, props);

  const { show } = props;
  const handleClose = (e) => {
    e.preventDefault();
    console.log(`Close the modal`);
    show(false);
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
            <h3>Delete Contact</h3>
            <button type='button' onClick={handleClose}>X</button>
          </div>
          <div className='modal-body'>
            <p>Are you sure you want to delete this contact?</p>
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