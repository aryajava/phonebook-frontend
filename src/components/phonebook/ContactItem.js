import React, { useState } from 'react';
import { faPenToSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteContact } from './DeleteContact';

export const ContactItem = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(`Edit the contact`);
    setIsEditing(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div id='contact-avatar'>
            <img src='https://www.shutterstock.com/shutterstock/photos/1095249842/display_1500/stock-vector-blank-avatar-photo-place-holder-1095249842.jpg' alt='John Doe' />
          </div>
          <div id='contact-info'>
            {
              isEditing ?
                (
                  <>
                    <input type='text' id='name' placeholder='Name' defaultValue={'John Doe'} />
                    <input type='text' id='phone' placeholder='Phone' defaultValue={'123-456-7890'} />
                  </>
                ) :
                (
                  <>
                    <p id='name'>John Doe</p>
                    <p id='phone'>123-456-7890</p>
                  </>
                )
            }
            <button type="button" onClick={!isEditing ? handleEdit : handleEditSave}><FontAwesomeIcon icon={!isEditing ? faPenToSquare : faSave} /></button>
            {
              !isEditing && <button type="button" onClick={handleShowModal}><FontAwesomeIcon icon={faTrash} /></button>
            }
          </div>
        </div>
      </div>
      {showModal && <DeleteContact show={showModal} onClose={handleCloseModal} />}
    </>
  );
};