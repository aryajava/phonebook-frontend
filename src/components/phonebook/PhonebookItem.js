import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useRef } from 'react';
import { getAvatar, updatePhonebook, updateAvatar } from '../../services/phonebookApi';
import { usePhonebookContext } from '../../context/PhonebookContext';

export const PhonebookItem = (props) => {
  const { id, name, phone, avatar } = props;
  const { state, dispatch } = usePhonebookContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [alertMessage, setAlertMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    setIsEditing(false);
    try {
      const data = await updatePhonebook(id, {
        name: editedName,
        phone: editedPhone,
      });
      dispatch({ type: 'UPDATE_ITEM', payload: { id, updatedItem: data } });
      dispatch({ type: 'RESET', payload: { keyword: state.searchKeyword, order: state.sortOrder } });
    } catch (error) {
      console.error('Error updating phonebook:', error.code);
      setAlertMessage(error.response.data.error + '!');
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const data = await updateAvatar(id, formData);
        dispatch({ type: 'UPDATE_ITEM', payload: { id, updatedItem: data } });
      } catch (error) {
        console.error('Error uploading avatar:', error.code);
        setAlertMessage(error.response.data.error + '!');
      }
    }
  };

  const avatarUrl = getAvatar(id, avatar);

  return (
    <div className='col-xl-3 col-md-4 col-12'>
      <div className='card'>
        {alertMessage && (
          <div className='alert mb-3' id='alert' role='alert'>
            <button className='close-btn' onClick={() => setAlertMessage(null)}>x</button>
            <p id='alertMessage'>{alertMessage}</p>
          </div>
        )}
        <div className='card-body'>
          <div className='row'>
            <div className='col-5 pr-3 justify-content-center'>
              <img src={avatarUrl} alt={name} onClick={handleImageClick} style={{ cursor: 'pointer' }} />
              <input
                type='file'
                ref={fileInputRef}
                style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, overflow: 'hidden', border: 0, padding: 0, margin: '-1px' }}
                aria-hidden='true'
                onChange={handleFileChange}
              />
            </div>
            <div className='col-7'>
              {isEditing ? (
                <>
                  <input type='text' value={editedName} onChange={(e) => setEditedName(e.target.value)} className='form-control-item mb-1' />
                  <input type='text' value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} className='form-control-item mb-1' />
                </>
              ) : (
                <>
                  <p className='card-item-text p-1'>{name}</p>
                  <p className='card-item-text p-1'>{phone}</p>
                </>
              )}
              <div className='row'>
                <button type='button' onClick={isEditing ? handleSaveClick : handleEditClick} className='m-0 btn btn-card p-2'>
                  <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} width={14} />
                </button>
                {!isEditing && (
                  <button onClick={() => dispatch({ type: 'SHOW_DELETE_MODAL', payload: { id, name } })} className='m-0 btn btn-card p-2' >
                    <FontAwesomeIcon icon={faTrash} width={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};