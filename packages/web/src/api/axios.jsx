import axios from 'axios';

const API_HOST_URL = import.meta.env.VITE_API_HOST_URL;

export const axiosPublic = new axios.create({
  baseURL: API_HOST_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

export const axiosPrivate = new axios.create({
  baseURL: API_HOST_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosPublic;
