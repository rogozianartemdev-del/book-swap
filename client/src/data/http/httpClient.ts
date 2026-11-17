import { API_URL } from '../../config/config';
import axios from 'axios';
import { authStorage } from '../storage/authStorage';

export const httpClient = axios.create({ baseURL: API_URL });

httpClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(undefined, (error) => {
  const isAuthRequest = error.config?.url?.startsWith('/auth');

  if (error.response?.status === 401 && !isAuthRequest) {
    authStorage.clear();
    window.location.assign('/login');
  }

  return Promise.reject(error);
});