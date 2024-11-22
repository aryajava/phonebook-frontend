import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from '../features/phonebook/phonebookSlice';

export const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
});
