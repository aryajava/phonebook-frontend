import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addContacts } from './phonebookSlice';

export const AddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await dispatch(addContacts({ name, phone }));
    if (result.payload?.error) {
      setError(result.payload.error);
    } else {
      setError('');
      navigate('/');
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <div className='form'>
        {error && <div className='alert-error'>{error}</div>}
        <input type='text' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='text' id='phone' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div className='form-action'>
          <button type='button' className='btn-brown' onClick={handleSave}>Save</button>
          <button type='button' className='btn-brown' onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
}