import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createContact, deleteContact, getAvatarContact, getContacts, updateContact } from './api/phonebookApi';

const initialState = {
  contacts: [],
  // isFetching: false,
  searchKeyword: '',
  sortOrder: 'asc',
  page: 1,
  status: 'idle',
};

export const getContactsAsync = createAsyncThunk(
  'phonebook/getContacts',
  async ({ page = 1, keyword = '', sort = 'asc' }) => {
    const response = await getContacts(page, keyword, sort);
    return { data: response.data, page, keyword, sort };
  }
);

export const addContactAsync = createAsyncThunk(
  'phonebook/addContact',
  async (data) => {
    const response = await createContact(data);
    return response.data;
  }
);

export const editContactAsync = createAsyncThunk(
  'phonebook/editContact',
  async ({ id, data }) => {
    const response = await updateContact(id, data);
    return response.data;
  }
);

export const deleteContactAsync = createAsyncThunk(
  'phonebook/deleteContact',
  async (id) => {
    await deleteContact(id);
    return id;
  }
);

export const updateAvatarContactAsync = createAsyncThunk(
  'phonebook/updateAvatarContact',
  async ({ id, avatar }) => {
    await updateContact(id, { avatar });
    return { id, avatar };
  }
);

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload.phonebooks;
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
    addContact: (state, action) => {
      state.contacts = [action.payload, ...state.contacts];
    },
    editContact: (state, action) => {
      const { id, data } = action.payload;
      const index = state.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        state.contacts[index] = { ...state.contacts[index], ...data };
      }
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(item => item.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContactsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContactsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.page = action.payload.page;
        state.searchKeyword = action.payload.keyword;
        state.sortOrder = action.payload.sort;
        if (Array.isArray(action.payload.data.phonebooks)) {
          state.contacts = action.payload.data.phonebooks.map(contact => {
            return {
              ...contact,
              avatar: getAvatarContact(contact.id, contact.avatar)
            };
          });
        } else {
          console.error('Expected an array but got:', action.payload.data);
        }
      })
      .addCase(addContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = action.payload;
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
  setPage,
  setSearchKeyword,
  setSortOrder,
  addContact,
  editContact,
  removeContact,
} = phonebookSlice.actions;

export const addContacts = (data) => async (dispatch) => {
  dispatch(addContact(data));
  dispatch(addContactAsync(data));
};

export const editContacts = (data) => async (dispatch, getState) => {
  const state = getState();
  const currentKeyword = state.phonebook.searchKeyword;
  const currentSortOrder = state.phonebook.sortOrder;
  dispatch(editContact(data));
  await dispatch(editContactAsync(data));
  dispatch(getContactsAsync({ page: 1, keyword: currentKeyword, sort: currentSortOrder }));
};

export const deleteContacts = (id) => async (dispatch, getState) => {
  const state = getState();
  const currentKeyword = state.phonebook.searchKeyword;
  const currentSortOrder = state.phonebook.sortOrder;
  dispatch(removeContact(id));
  await dispatch(deleteContactAsync(id));
  dispatch(getContactsAsync({ page: 1, keyword: currentKeyword, sort: currentSortOrder }));
};

export default phonebookSlice.reducer;