import { createSlice } from '@reduxjs/toolkit';
import { getPhonebooksAsync, addContactAsync, editContactAsync, deleteContactAsync } from './phonebookThunks';
import { getAvatarContact } from './api/phonebookApi';

const initialState = {
  contacts: [],
  isFetching: false,
  searchKeyword: '',
  sortOrder: 'asc',
  page: 1,
  isEditModalVisible: false,
  isDeleteModalVisible: false,
  contactToDelete: null,
  status: 'idle',
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload.page === 1 ?
        action.payload.phonebooks :
        [...state.contacts, ...action.payload.phonebooks];
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
      state.contacts = [];
      state.page = 1;
      state.searchKeyword = action.payload.keyword;
      state.sortOrder = action.payload.order;
    },
    addContact: (state, action) => {
      state.contacts = [action.payload, ...state.contacts];
    },
    editContact: (state, action) => {
      state.contacts = state.contacts.map((item) =>
        item.id === action.payload.id ? action.payload.updatedItem : item
      );
    },
    showDeleteModal: (state, action) => {
      state.isDeleteModalVisible = true;
      state.contactToDelete = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalVisible = false;
      state.contactToDelete = null;
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhonebooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPhonebooksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (Array.isArray(action.payload.phonebooks)) {
          state.contacts = action.payload.phonebooks.map(contact => {
            return {
              ...contact,
              avatar: getAvatarContact(contact.id, contact.avatar)
            };
          });
        } else {
          console.error('Expected an array but got:', action.payload);
        }
      })
      .addCase(addContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = [action.payload, ...state.contacts];
      })
      .addCase(editContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editContactAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = state.contacts.map(contact => {
          if (contact.id === action.payload.id) {
            return {
              ...action.payload,
              avatar: getAvatarContact(contact.id, contact.avatar)
            };
          }
          return contact;
        });
      })
      .addCase(deleteContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  },
});

export const {
  setContacts,
  setFetching,
  setPage,
  setSearchKeyword,
  setSortOrder,
  reset,
  addContact,
  editContact,
  showDeleteModal,
  closeDeleteModal,
  removeContact,
} = phonebookSlice.actions;

export default phonebookSlice.reducer;