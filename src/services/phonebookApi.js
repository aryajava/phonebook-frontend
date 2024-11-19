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
// add a new phonebook
// update a phonebook
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