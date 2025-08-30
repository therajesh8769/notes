import axios from 'axios';

const API_BASE_URL = 'https://notesbackend-mocha.vercel.app';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

export const authAPI = {
  setAuthToken: (token: string | null) => {
    authToken = token;
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  signup: async (data: { name: string; dateOfBirth: string; email: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  verifyOTP: async (data: { name: string; dateOfBirth: string; email: string; otp: string }) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
  },

  requestLoginOTP: async (email: string) => {
    const response = await api.post('/auth/request-login-otp', { email });
    return response.data;
  },

  login: async (email: string, otp: string) => {
    const response = await api.post('/auth/login', { email, otp });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },
};

export const notesAPI = {
  getNotes: async () => {
    const response = await api.get('/notes');
    return response.data;
  },

  createNote: async (data: { title: string; content: string }) => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

export default api;