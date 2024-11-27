import React from 'react';
import { request } from '../services/phonebookApi';

export const PhonebookDelete = (props) => {
  const { id, name, removePhonebookItem, closeDeleteModal } = props;

  const handleDeleteClick = async () => {
    try {
      await request.delete(id.toString());
      removePhonebookItem(id);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting phonebook:', error.code);
    }
  };

  return (
    <>
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
            <button type="button" className="btn-brown" onClick={closeDeleteModal}>No</button>
            <button type="button" className="btn-brown" onClick={handleDeleteClick}>Yes</button>
          </div>
        </div>
      </div>
    </>
  );
};