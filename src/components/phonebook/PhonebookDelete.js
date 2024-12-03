import React from 'react';
import { deletePhonebookItem } from '../../services/phonebookApi';
import { usePhonebookContext } from '../../context/PhonebookContext';

export const PhonebookDelete = (props) => {
  const { id, name } = props;
  const { dispatch } = usePhonebookContext();

  const handleDeleteClick = async () => {
    try {
      await deletePhonebookItem(id);
      dispatch({ type: 'REMOVE_ITEM', payload: id });
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
    } catch (error) {
      console.error('Error deleting phonebook:', error.code);
    }
  };

  const handleCloseClick = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
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