import axios from 'axios';
import { toast } from 'react-toastify';
import { isAuthenticated } from 'services/auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://tools.rocketseat.com.br/api',
});

api.interceptors.request.use(config => {
  if (isAuthenticated()) {
    const token = localStorage.getItem('@JumpstartTools:token');
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, err => {
  toast.error(err.response.data.error);
  return Promise.reject(err);
});

export default api;

