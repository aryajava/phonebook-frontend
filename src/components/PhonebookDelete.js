import React from 'react';

export const PhonebookDelete = ({ name, handleDeleteClick }) => {
  const closeDeleteModal = () => {
    document.getElementById('deleteModal').classList.remove('show');
  };

  return (
    <>
      <div id="deleteModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h1>Delete Confirmation</h1>
            <span className="close" onClick={closeDeleteModal}>&times;</span>
          </div>
          <div className="modal-body">
            <p>Apakah kamu yakin akan menghapus data: '<span id="deleteItemName">{name}</span>'?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-brown px-3 py-2 mx-2" onClick={closeDeleteModal}>No</button>
            <button type="button" className="btn btn-brown px-3 py-2 mx-2" onClick={handleDeleteClick}>Yes</button>
          </div>
        </div>
      </div>
    </>
  );
};