import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addContacts, setContacts } from './phonebookSlice';

export const AddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keyword = useSelector((state) => state.phonebook.searchKeyword);
  const sort = useSelector((state) => state.phonebook.sortOrder);

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(addContacts({ name, phone })).then(() => {
      dispatch(setContacts({ page: 1, keyword, sort }));
    });
    navigate('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch(setContacts({ page: 1, keyword, sort }));
    navigate('/');
  };

  return (
    <>
      <div className='form'>
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