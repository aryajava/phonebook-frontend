import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { request, getBaseURL } from '../services/phonebookApi';

export const PhonebookItem = (props) => {
  const { id, name, phone, avatar, updatePhonebookItem, showDeleteModal } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);
  const fileInputRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    setIsEditing(false);
    try {
      const response = await request.put(id.toString(), {
        name: editedName,
        phone: editedPhone,
      });
      updatePhonebookItem(id, response.data);
    } catch (error) {
      console.error('Error updating phonebook:', error.code);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      try {
        const response = await request.put(`${id}/avatar`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatePhonebookItem(id, response.data);
      } catch (error) {
        console.error('Error uploading avatar:', error.code);
        setAlertMessage(error.response.data.error + '!');
        setShowAlert(true);
      }
    }
  };

  let avatarUrl = `${getBaseURL()}/images/${id}/${avatar}`;
  if (!avatar) {
    avatarUrl = `${getBaseURL()}/images/defaultAvatar.png`;
  }

  return (
    <>
      <div className='card'>
        {showAlert && (
          <div className='alert' id='alert' role='alert'>
            <button className='close-btn' onClick={closeAlert}>x</button>
            <p id='alertMessage'>{alertMessage}</p>
          </div>
        )}
        <div className='card-body'>
          <img src={avatarUrl} alt={name} onClick={handleImageClick} className='avatar' />
          <input
            type='file'
            ref={fileInputRef}
            style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, overflow: 'hidden', border: 0, padding: 0, margin: '-1px' }}
            aria-hidden='true'
            onChange={handleFileChange}
          />
          <div className='card-content'>
            {isEditing ? (
              <>
                <input type='text' value={editedName} onChange={(e) => setEditedName(e.target.value)} className='form-control' />
                <input type='text' value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} className='form-control' />
              </>
            ) : (
              <>
                <p className='card-text'>{name}</p>
                <p className='card-text'>{phone}</p>
              </>
            )}
            <div className='button-group'>
              <button type='button' onClick={isEditing ? handleSaveClick : handleEditClick} className='btn-action'>
                <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} width={14} />
              </button>
              {!isEditing && (
                <button onClick={() => showDeleteModal({ id, name })} className='btn-action' >
                  <FontAwesomeIcon icon={faTrash} width={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};