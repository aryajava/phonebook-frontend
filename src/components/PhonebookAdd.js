import React, { useState } from 'react';
import axios from 'axios';

export const PhonebookAdd = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const request = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
  });

  const handleCancel = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleSave = async () => {
    try {
      await request.post('api/phonebooks', { name, phone });
      window.location.href = '/';
    } catch (error) {
      console.error(error.code);
      setAlertMessage(error.response.data.error + '!');
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <div className='alert mt-3' id='alert' role='alert'>
          <button className='close-btn' onClick={closeAlert}>x</button>
          <p id='alertMessage'>{alertMessage}</p>
        </div>
      )}

      <div className="row my-2">
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
      </div>
      <div className="row my-2">
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
      <div className="row my-2">
        <button type="button" id='saveData' className="col btn btn-brown mr-3" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleCancel} className="col btn btn-brown ml-3">Cancel</button>
      </div>
    </>
  );
};