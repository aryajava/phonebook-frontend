import React, { useRef, useState } from 'react';
import { faPenToSquare, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteContact } from './DeleteContact';
import { useDispatch } from 'react-redux';
import { deleteContacts, editContacts, updateAvatarContacts } from './phonebookSlice';

export const ContactItem = ({ contact }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    const data = { name, phone };
    const result = await dispatch(editContacts({ id: contact.id, data }));
    if (result.payload?.error) {
      // Tangkap pesan error dari payload
      setError(result.payload.error);
    } else {
      setError(''); // Reset error jika berhasil
      setIsEditing(false);
    }
  };


  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const result = await dispatch(updateAvatarContacts(contact.id, file));
      if (result.payload?.error) {
        setError(result.payload.error);
      } else {
        setError('');
      }
    }
  };

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
        {error && <div className='alert-error'>{error}</div>}
        <div className='card-body'>
          <div id='contact-avatar'>
            <img src={contact.avatar} alt={contact.name} onClick={handleImageClick} />
            <input
              type='file'
              ref={fileInputRef}
              aria-hidden='true'
              onChange={handleFileChange}
            />
          </div>
          <div id='contact-info'>
            {isEditing ? (
              <>
                <input
                  type='text'
                  id='name'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type='text'
                  id='phone'
                  placeholder='Phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            ) : (
              <>
                <p id='name'>{contact.name}</p>
                <p id='phone'>{contact.phone}</p>
              </>
            )}
            <button
              type="button"
              onClick={!isEditing ? handleEdit : handleEditSave}
            >
              <FontAwesomeIcon icon={!isEditing ? faPenToSquare : faSave} />
            </button>
            {!isEditing && (
              <button type="button" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <DeleteContact
          show={showModal}
          onClose={handleCloseModal}
          onDelete={handleDelete}
          data={contact}
        />
      )}
    </>
  );
};