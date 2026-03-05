import axios from 'axios';

const BASE_URL = 'https://finance-tracker-production-fb3d.up.railway.app';
const USER_ID = 1;

const api = axios.create({ baseURL: BASE_URL });

export const getSummary = () => api.get(`/users/${USER_ID}/summary`);
export const getTransactions = () => api.get(`/users/${USER_ID}/transactions`);
export const createTransaction = (data) => api.post(`/users/${USER_ID}/transactions`, [data]);
export const deleteTransaction = (id) => api.delete(`/users/${USER_ID}/transactions/${id}`);
export const getAccounts = () => api.get(`/users/${USER_ID}/accounts`);
export const createAccount = (data) => api.post(`/users/${USER_ID}/accounts`, [data]);
export const deleteAccount = (id) => api.delete(`/users/${USER_ID}/accounts/${id}`);
export const getCategories = () => api.get(`/users/${USER_ID}/categories`);
export const createCategory = (data) => api.post(`/users/${USER_ID}/categories`, [data]);
export const deleteCategory = (id) => api.delete(`/users/${USER_ID}/categories/${id}`);
