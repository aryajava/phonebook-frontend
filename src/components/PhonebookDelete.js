import React from 'react';
import { deletePhonebookItem } from '../services/phonebookApi';

export const PhonebookDelete = ({ id, name, removePhonebookItem, closeDeleteModal }) => {
  const handleDeleteClick = async () => {
    try {
      await deletePhonebookItem(id);
      removePhonebookItem(id);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting phonebook:', error.code);
    }
  };

  return (
    <div id="deleteModal" className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h1>Delete Confirmation</h1>
          <span className="close" onClick={closeDeleteModal}>&times;</span>
        </div>
        <div className="modal-body">
          <p>Apakah kamu yakin akan menghapus data: '{name}'?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-brown px-3 py-2 mx-2" onClick={closeDeleteModal}>No</button>
          <button type="button" className="btn btn-brown px-3 py-2 mx-2" onClick={handleDeleteClick}>Yes</button>
        </div>
      </div>
    </div>
  );
};
