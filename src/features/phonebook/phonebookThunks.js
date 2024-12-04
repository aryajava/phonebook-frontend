// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getPhonebooks, createContact, updateContact, deleteContact } from './api/phonebookApi';
// import { setContacts, addContact, editContact, removeContact } from './phonebookSlice';

// export const getPhonebooksAsync = createAsyncThunk(
//   'phonebook/getPhonebooks',
//   async ({ page = 1, keyword = '', sort = 'asc' }, { dispatch }) => {
//     console.log(`Fetching phonebooks with page: ${page}, keyword: ${keyword}, sort: ${sort}`);
//     const response = await getPhonebooks(page, keyword, sort);
//     dispatch(setContacts({ phonebooks: response.data, page }));
//     return response.data;
//   }
// );

// export const addContactAsync = createAsyncThunk(
//   'phonebook/addContact',
//   async (data, { dispatch }) => {
//     const response = await createContact(data);
//     dispatch(addContact(response.data));
//     return response.data;
//   }
// );

// export const editContactAsync = createAsyncThunk(
//   'phonebook/editContact',
//   async ({ id, data }, { dispatch }) => {
//     const response = await updateContact(id, data);
//     dispatch(editContact({ id, updatedItem: response.data }));
//     return response.data;
//   }
// );

// export const deleteContactAsync = createAsyncThunk(
//   'phonebook/deleteContact',
//   async (id, { dispatch }) => {
//     await deleteContact(id);
//     dispatch(removeContact({ id }));
//     return id;
//   }
// );