import { getBaseURL, request } from "../../../services/api";

// get phonebooks with pagination, search, and sorting
export const getPhonebooks = (page, keyword = '', sort = 'asc') => {
  const params = new URLSearchParams();
  params.append('page', page);
  if (keyword) params.append('keyword', keyword);
  params.append('sort', sort);
  return request.get(`?${params.toString()}`);
};

// get avatar image
export const getAvatarContact = (id, avatar) => {
  if (!avatar) return `${getBaseURL()}/images/defaultAvatar.png`;
  return `${getBaseURL()}/images/${id}/${avatar}`;
};

// add a new contact
export const createContact = (contact) => request.post('', contact);

// edit a contact
export const updateContact = (id, data) => request.put(id.toString(), data);

// update avatar contact
export const updateAvatarContact = async (id, data) => request.put(`${id}/avatar`, data, { headers: { 'Content-Type': 'multipart/form-data' } });

// delete a contact
export const deleteContact = async (id) => request.delete(id.toString());