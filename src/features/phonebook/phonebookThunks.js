import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPhonebooks, addPhonebook, updatePhonebook, deletePhonebookItem } from '../../services/phonebookApi';
import { setItems, addItem, updateItem, removeItem } from './phonebookSlice';

export const fetchPhonebookItems = createAsyncThunk(
  'phonebook/fetchPhonebookItems',
  async ({ page, keyword, sort }, { dispatch }) => {
    const response = await fetchPhonebooks(page, keyword, sort);
    console.log('Fetched data:', response); // Tambahkan ini untuk memeriksa data
    dispatch(setItems({ phonebooks: response.phonebooks, page }));
    return response.pages > response.page;
  }
);

export const addNewPhonebook = createAsyncThunk(
  'phonebook/addNewPhonebook',
  async (data, { dispatch }) => {
    const response = await addPhonebook(data);
    dispatch(addItem(response));
  }
);

export const updatePhonebookItem = createAsyncThunk(
  'phonebook/updatePhonebookItem',
  async ({ id, data }, { dispatch }) => {
    const response = await updatePhonebook(id, data);
    dispatch(updateItem({ id, updatedItem: response }));
  }
);

export const deletePhonebook = createAsyncThunk(
  'phonebook/deletePhonebook',
  async (id, { dispatch }) => {
    await deletePhonebookItem(id);
    dispatch(removeItem({ id }));
  }
);