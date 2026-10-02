
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ticketflow-api.skillnestco.xyz/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getCsrfToken = async () => {
  const response = await API.get('users/csrf/');
  return response.data.csrfToken;
};

export default API;
