import React, { useState } from 'react';
import { faPenToSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteContact } from './DeleteContact';
import { useDispatch } from 'react-redux';
import { deleteContactAsync, editContactAsync } from './phonebookThunks';

export const ContactItem = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const data = { name, phone };
    dispatch(editContactAsync({ id: contact.id, data }));
    setIsEditing(false);
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteContactAsync(contact.id));
    setShowModal(false);
  };

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div id='contact-avatar'>
            <img src={contact.avatar} alt={contact.name} />
          </div>
          <div id='contact-info'>
            {
              isEditing ?
                (
                  <>
                    <input type='text' id='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type='text' id='phone' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </>
                ) :
                (
                  <>
                    <p id='name'>{contact.name}</p>
                    <p id='phone'>{contact.phone}</p>
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
      {showModal && <DeleteContact show={showModal} onClose={handleCloseModal} onDelete={handleDelete} />}
    </>
  );
};