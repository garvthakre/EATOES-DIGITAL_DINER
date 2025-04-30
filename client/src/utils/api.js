 
import config from './config';

const API_URL = config.apiUrl;

const api = {
  // Auth endpoints
  login: (credentials) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(res => res.json()),
  
  signup: (userData) => fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(res => res.json()),
  
  // Menu endpoints
  getMenu: () => fetch(`${API_URL}/menu`).then(res => res.json()),
  
  getMenuItem: (id) => fetch(`${API_URL}/menu/${id}`).then(res => res.json()),
  
  // Order endpoints
  createOrder: (orderData) => fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(orderData)
  }).then(res => res.json()),
  
  getOrder: (id) => fetch(`${API_URL}/orders/${id}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()),
  
  getUserOrders: (userId) => fetch(`${API_URL}/orders/user/${userId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()),
  
  // User endpoints
  getUserProfile: (id) => fetch(`${API_URL}/users/${id}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json()),
  
  updateUserProfile: (id, userData) => fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userData)
  }).then(res => res.json())
};

export default api;