import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ticketflow-api.skillnestco.xyz/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Read the CSRF token from the browser cookie and set it in the headers for all requests
API.interceptors.request.use((config) => {
  const csrfToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];

  if (csrfToken) {
    config.headers['X-CSRFToken'] = decodeURIComponent(csrfToken);
  }

  return config;
});


export default API;