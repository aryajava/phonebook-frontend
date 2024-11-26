import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePhonebook } from '../features/phonebook/phonebookThunks';
import { closeDeleteModal } from '../features/phonebook/phonebookSlice';

export const PhonebookDelete = ({ id, name }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    try {
      dispatch(deletePhonebook(id));
      dispatch(closeDeleteModal());
    } catch (error) {
      console.error('Error deleting phonebook:', error.code);
    }
  };

  const handleCloseClick = () => {
    dispatch(closeDeleteModal());
  };

  return (
    <div id="deleteModal" className="modal show">
      <div className="modal-content">
        <div className="modal-header">
          <h1>Delete Confirmation</h1>
          <span className="close" onClick={handleCloseClick}>&times;</span>
        </div>
        <div className="modal-body">
          <p>Apakah kamu yakin akan menghapus data: '{name}'?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-brown px-3 py-2 mx-2" onClick={handleCloseClick}>No</button>
          <button type="button" className="btn btn-brown px-3 py-2 mx-2" onClick={handleDeleteClick}>Yes</button>
        </div>
      </div>
    </div>
  );
};