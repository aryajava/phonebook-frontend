import React, { useRef, useState } from 'react';
import { faPenToSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteContact } from './DeleteContact';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts, editContacts } from './phonebookSlice';

export const ContactItem = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.phonebook.searchKeyword);
  const sort = useSelector((state) => state.phonebook.sortOrder);
  const fileInputRef = useRef(null);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const data = { name, phone };
    setIsEditing(false);
    dispatch(editContacts({ id: contact.id, data }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(`File: ${file}`);

  }

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteContacts(contact.id));
    setShowModal(false);
  };

  return (
    <>
      <div className='card'>
        <div className='card-body'>
          <div id='contact-avatar'>
            <img src={contact.avatar} alt={contact.name} onClick={handleImageClick} />
            <input
              type='file'
              ref={fileInputRef}
              style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, overflow: 'hidden', border: 0, padding: 0, margin: '-1px' }}
              aria-hidden='true'
              onChange={handleFileChange}
            />
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
      {showModal && <DeleteContact show={showModal} onClose={handleCloseModal} onDelete={handleDelete} data={contact} />}
    </>
  );
};