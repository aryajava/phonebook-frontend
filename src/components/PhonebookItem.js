import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 1000,
});

export const PhonebookItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.name);
  const [editedPhone, setEditedPhone] = useState(props.phone);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Here you can add logic to save the edited data
  };

  const showModal = () => {
    document.getElementById('deleteModal').classList.add('show');
  };

  const avatarUrl = props.avatar ? `http://localhost:3001/images/${props.id}/${props.avatar}` : 'http://localhost:3001/images/defaultAvatar.png';

  return (
    <div className='col-xl-3 col-md-4 col-12'>
      <div className='card'>
        <div className='card-body'>
          <div className='row'>
            <div className='col-5 pr-3 justify-content-center'>
              <img src={avatarUrl} alt={props.name} />
            </div>
            <div className='col-7'>
              {isEditing ? (
                <>
                  <input type='text' value={editedName} onChange={(e) => setEditedName(e.target.value)} className='form-control-item mb-1' />
                  <input type='text' value={editedPhone} onChange={(e) => setEditedPhone(e.target.value)} className='form-control-item mb-1' />
                </>
              ) : (
                <>
                  <p className='card-item-text p-1'>{props.name}</p>
                  <p className='card-item-text p-1'>{props.phone}</p>
                </>
              )}
              <div className='row'>
                <button type='button' onClick={isEditing ? handleSaveClick : handleEditClick} className='m-0 btn btn-card p-2'>
                  <FontAwesomeIcon icon={isEditing ? faSave : faPenToSquare} width={14} />
                </button>
                {!isEditing && (
                  <button onClick={showModal} className='m-0 btn btn-card p-2'>
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