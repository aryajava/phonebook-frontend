import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createContact, deleteContact, getAvatarContact, getContacts, updateAvatarContact, updateContact } from './api/phonebookApi';

const initialState = {
  contacts: [],
  searchKeyword: '',
  sortOrder: 'asc',
  page: 1,
  hasMore: true,
  status: 'idle',
};

export const getContactsAsync = createAsyncThunk(
  'phonebook/getContacts',
  async ({ page = 1, keyword = '', sort = 'asc' }) => {
    console.log(`Fetching contacts with page: ${page}, keyword: ${keyword}, sort: ${sort}`);
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

    }
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
    const uploadAvatar = new FormData();
    uploadAvatar.append('avatar', avatar);
    const response = await updateAvatarContact(id, uploadAvatar);
    return { id, avatar: response.data.avatar };
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
        } else if (isLastPage) {
          console.log('No more contacts to fetch.');
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
      .addCase(updateAvatarContactAsync.rejected, (state) => {
        state.status = 'failed';
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
} = phonebookSlice.actions;

export const addContacts = (data) => async (dispatch, getState) => {
  const state = getState();
  const currentKeyword = state.phonebook.searchKeyword;
  const currentSortOrder = state.phonebook.sortOrder;
  dispatch(addContact(data));
  await dispatch(addContactAsync(data));
  dispatch(getContactsAsync({ page: 1, keyword: currentKeyword, sort: currentSortOrder }));
};

export const editContacts = (data) => async (dispatch, getState) => {
  const state = getState();
  const currentKeyword = state.phonebook.searchKeyword;
  const currentSortOrder = state.phonebook.sortOrder;
  dispatch(editContact(data));
  await dispatch(editContactAsync(data));
  dispatch(getContactsAsync({ page: 1, keyword: currentKeyword, sort: currentSortOrder }));
};

export const updateAvatarContacts = (id, avatar) => async (dispatch) => {
  console.log(`Updating avatar for contact with id: ${id}, avatar: ${avatar}`);
  dispatch(avatarContact({ id, avatar }));
  await dispatch(updateAvatarContactAsync({ id, avatar }));
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