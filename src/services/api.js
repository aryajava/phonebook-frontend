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
