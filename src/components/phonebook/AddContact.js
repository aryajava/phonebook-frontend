import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AddContact = () => {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    console.log(`Save the contact`);
    navigate('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log(`Cancel the contact`);
    navigate('/');
  };
  return (
    <>
      <div className='form'>
        <input type='text' id='name' placeholder='Name' />
        <input type='text' id='phone' placeholder='Phone' />
        <div className='form-action'>
          <button type='button' className='btn-brown' onClick={handleSave}>Save</button>
          <button type='button' className='btn-brown' onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
}