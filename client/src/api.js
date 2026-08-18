import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

export const getTasks = async (params = {}) => {
  const { data } = await axios.get(API_URL, { params });
  return data;
};

export const getTask = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createTask = async (taskData) => {
  const { data } = await axios.post(API_URL, taskData);
  return data;
};

export const updateTask = async (id, taskData) => {
  const { data } = await axios.put(`${API_URL}/${id}`, taskData);
  return data;
};

export const deleteTask = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
