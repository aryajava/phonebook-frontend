import axios from "axios";

export const getBaseURL = () => {
  const port = 3001;
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}`;
};

export const request = axios.create({
  baseURL: `${getBaseURL()}/api/phonebooks/`,
  timeout: 1000
});

// Fetch phonebooks with pagination, search, and sorting
export const fetchPhonebooks = async (page, keyword = '', sort = 'asc') => {
  const params = new URLSearchParams();
  params.append('page', page);
  if (keyword) params.append('keyword', keyword);
  params.append('sort', sort);
  try {
    const response = await request.get(`?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching phonebooks:', error.code);
    throw error;
  }
};

// get avatar image
export const getAvatar = (id, avatar) => {
  if (!avatar) return `${getBaseURL()}/images/defaultAvatar.png`;
  return `${getBaseURL()}/images/${id}/${avatar}`;
};

// add a new phonebook
export const addPhonebook = async (data) => {
  try {
    const response = await request.post('', data);
    return response.data;
  } catch (error) {
    console.error('Error adding phonebook:', error.code);
    throw error;
  }
};

// update a phonebook item
export const updatePhonebook = async (id, data) => {
  try {
    const response = await request.put(id.toString(), data);
    return response.data;
  } catch (error) {
    console.error('Error updating phonebook:', error.code);
    throw error;
  }
};

// update avatar a phonebook
export const updateAvatar = async (id, data) => {
  try {
    const response = await request.put(`${id}/avatar`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error.code);
    throw error;
  }
};
// delete a phonebook item
export const deletePhonebookItem = async (id) => {
  try {
    const response = await request.delete(id.toString());
    return response.data;
  } catch (error) {
    console.error('Error deleting phonebook:', error.code);
    throw error;
  }
};