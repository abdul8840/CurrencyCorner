import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => API.post('/auth/admin/login', data),
  logout: () => API.post('/auth/logout'),
  getMe: () => API.get('/auth/me')
};

export const dashboardAPI = {
  getStats: () => API.get('/admin/dashboard')
};

export const productAPI = {
  getAll: (params) => API.get('/products/admin', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (formData) => API.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => API.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => API.delete(`/products/${id}`)
};

export const categoryAPI = {
  getAll: () => API.get('/categories/admin'),
  getById: (id) => API.get(`/categories/${id}`),
  create: (formData) => API.post('/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => API.put(`/categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => API.delete(`/categories/${id}`)
};

export const orderAPI = {
  getAll: (params) => API.get('/orders/admin/all', { params }),
  getById: (id) => API.get(`/orders/${id}`),
  updateStatus: (id, data) => API.put(`/orders/admin/${id}/status`, data),
  getNew: () => API.get('/orders/admin/new'),
  markViewed: (id) => API.put(`/orders/admin/${id}/viewed`),
  markAllViewed: () => API.put('/orders/admin/mark-all-viewed'),
  downloadInvoice: (id) => API.get(`/orders/${id}/invoice`)
};

export const couponAPI = {
  getAll: () => API.get('/coupons'),
  getById: (id) => API.get(`/coupons/${id}`),
  create: (data) => API.post('/coupons', data),
  update: (id, data) => API.put(`/coupons/${id}`, data),
  delete: (id) => API.delete(`/coupons/${id}`)
};

export const userAPI = {
  getAll: (params) => API.get('/users/all', { params })
};

export const contactAPI = {
  getAll: (params) => API.get('/contact', { params }),
  updateStatus: (id, data) => API.put(`/contact/${id}`, data),
  delete: (id) => API.delete(`/contact/${id}`)
};

export default API;