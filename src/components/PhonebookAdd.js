import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewPhonebook } from '../features/phonebook/phonebookThunks';

export const PhonebookAdd = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleCancel = (e) => {
    e.preventDefault();
    setShowAlert(false);
    navigate('/');
  };

  const handleSave = () => {
    try {
      dispatch(addNewPhonebook({ name, phone }));
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
        <div className='alert my-2' id='alert' role='alert'>
          <button className='close-btn' onClick={() => setShowAlert(false)}>x</button>
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