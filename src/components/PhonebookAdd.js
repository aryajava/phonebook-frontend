import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../services/phonebookApi';


export const PhonebookAdd = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleSave = async () => {
    try {
      await request.post('', { name, phone });
      navigate('/');
    } catch (error) {
      console.error(error.code);
      setAlertMessage(error.response.data.error + '!');
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <div className='alert' id='alert' role='alert'>
          <button className='close-btn' onClick={closeAlert}>x</button>
          <p id='alertMessage'>{alertMessage}</p>
        </div>
      )}
      <div className='form-group'>
        <input
          type="text"
          className="form-control"
          id="name"
          name='name'
          required
          placeholder='Name'
          autoComplete='none'
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          id="phone"
          name='phone'
          required
          placeholder='Phone'
          autoComplete='none'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className='button-group'>
        <button type="button" id='saveData' className="col btn btn-brown mr-3" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleCancel} className="col btn btn-brown ml-3">Cancel</button>
      </div>
    </>
  );
};