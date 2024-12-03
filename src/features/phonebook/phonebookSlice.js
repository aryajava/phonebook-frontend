// src/features/phonebook/phonebookSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phonebookItems: [],
  isFetching: false,
  searchKeyword: '',
  sortOrder: 'asc',
  page: 1,
  isEditModalVisible: false,
  isDeleteModalVisible: false,
  itemToDelete: null,
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.phonebookItems = action.payload.page === 1 ?
        action.payload.phonebooks :
        [...state.phonebookItems, ...action.payload.phonebooks];
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    reset: (state, action) => {
      state.phonebookItems = [];
      state.page = 1;
      state.searchKeyword = action.payload.keyword;
      state.sortOrder = action.payload.order;
    },
    addItem: (state, action) => {
      state.phonebookItems = [action.payload, ...state.phonebookItems];
    },
    updateItem: (state, action) => {
      state.phonebookItems = state.phonebookItems.map((item) =>
        item.id === action.payload.id ? action.payload.updatedItem : item
      );
    },
    showDeleteModal: (state, action) => {
      state.isDeleteModalVisible = true;
      state.itemToDelete = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalVisible = false;
      state.itemToDelete = null;
    },
    removeItem: (state, action) => {
      state.phonebookItems = state.phonebookItems.filter(item => item.id !== action.payload.id);
    },
  },
});

export const {
  setItems,
  setFetching,
  setPage,
  setSearchKeyword,
  setSortOrder,
  reset,
  addItem,
  updateItem,
  showDeleteModal,
  closeDeleteModal,
  removeItem,
} = phonebookSlice.actions;

export default phonebookSlice.reducer;