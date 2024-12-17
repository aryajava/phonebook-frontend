import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createContact, deleteContact, getAvatarContact, getContacts, updateAvatarContact, updateContact } from './api/phonebookApi';

const initialState = {
  contacts: [],
  searchKeyword: '',
  sortOrder: 'asc',
  page: 1,
  hasMore: true,
  status: 'idle',
  error: null,
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
  async (data, { rejectWithValue }) => {
    try {
      const response = await createContact(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editContactAsync = createAsyncThunk(
  'phonebook/editContact',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateContact(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
  async ({ id, avatar }, { rejectWithValue }) => {
    try {
      const uploadAvatar = new FormData();
      uploadAvatar.append('avatar', avatar);
      const response = await updateAvatarContact(id, uploadAvatar);
      return { id, avatar: response.data.avatar };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
    setHasMore: (state, action) => {
      state.hasMore = action.payload
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
    avatarContact: (state, action) => {
      const { id, avatar } = action.payload;
      const contact = state.contacts.find(contact => contact.id === id);
      if (contact) {
        contact.avatar = URL.createObjectURL(avatar);;
      }
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(item => item.id !== action.payload.id);
    },
    resetContacts: (state, action) => {
      state.contacts = [];
      state.page = 1;
      state.hasMore = true;
      state.searchKeyword = action.payload.searchKeyword;
      state.sortOrder = action.payload.sortOrder;
    },
    setError: (state, action) => {
      state.error = action.payload;
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

        // Periksa apakah ini halaman terakhir
        const isLastPage =
          !Array.isArray(action.payload.data.phonebooks) || // Jika tidak ada data sama sekali
          action.payload.data.phonebooks.length === 0; // Jika array kosong

        // Perbarui kontak jika masih ada data
        if (!isLastPage && Array.isArray(action.payload.data.phonebooks)) {
          state.contacts = Array.isArray(state.contacts) ? [
            ...state.contacts,
            ...action.payload.data.phonebooks
              .map((contact) => ({
                ...contact,
                avatar: getAvatarContact(contact.id, contact.avatar),
              }))
              .filter(
                (newContact) =>
                  !state.contacts.some((existingContact) => existingContact.id === newContact.id)
              ),
          ] : [];
        }
        // Set `hasMore` berdasarkan apakah ini halaman terakhir
        state.hasMore = !isLastPage;
      })
      .addCase(addContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(editContactAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
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
      .addCase(editContactAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(updateAvatarContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAvatarContactAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.contacts = state.contacts.map(contact => {
          if (contact.id === action.payload.id) {
            return {
              ...contact,
              avatar: getAvatarContact(contact.id, action.payload.avatar)
            };
          }
          return contact;
        });
      })
      .addCase(updateAvatarContactAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
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
  avatarContact,
  removeContact,
  resetContacts,
  setError,
} = phonebookSlice.actions;

export const addContacts = (data) => async (dispatch, getState) => {
  const state = getState();
  const currentKeyword = state.phonebook.searchKeyword;
  const currentSortOrder = state.phonebook.sortOrder;
  // dispatch(addContact(data));
  const result = await dispatch(addContactAsync(data));
  if (addContactAsync.fulfilled.match(result)) {
    dispatch(getContactsAsync({ page: 1, keyword: currentKeyword, sort: currentSortOrder }));
  }
  return result;
};

export const editContacts = ({ id, data }) => async (dispatch, getState) => {
  const state = getState();
  const currentKeyword = state.phonebook.searchKeyword;
  const currentSortOrder = state.phonebook.sortOrder;

  dispatch(editContact({ id, data }));
  const result = await dispatch(editContactAsync({ id, data }));
  if (editContactAsync.fulfilled.match(result)) {
    dispatch(getContactsAsync({ page: 1, keyword: currentKeyword, sort: currentSortOrder }));
  }
  return result;
};



export const updateAvatarContacts = (id, avatar) => async (dispatch) => {
  // dispatch(avatarContact({ id, avatar }));
  return await dispatch(updateAvatarContactAsync({ id, avatar }));
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