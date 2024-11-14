import React from 'react';

export const PhonebookAdd = () => {
  const handleCancel = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };
  return (
    <>
      <form>
        <div className="row my-2">
          <input type="text" className="form-control" id="name" name='name' required placeholder='Name' />
        </div>
        <div className="row my-2">
          <input type="text" className="form-control" id="phone" name='phone' required placeholder='Phone' />
        </div>
        <div className="row my-2">
          <button type="submit" className="col btn btn-brown mr-3">Save</button>
          <button type="button" onClick={handleCancel} className="col btn btn-brown ml-3">Cancel</button>
        </div>
      </form>
    </>
  );
};