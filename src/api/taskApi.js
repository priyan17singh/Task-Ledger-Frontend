import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Pulls the message out of your backend's { success, message } error shape,
// falling back to something readable if the network itself failed.
function extractErrorMessage(error) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'Something went wrong. Please try again.';
}

export async function fetchTasks(params = {}) {
  try {
    const { data } = await client.get('/tasks', { params });
    return data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function createTask(payload) {
  try {
    const { data } = await client.post('/tasks', payload);
    return data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function updateTask(id, payload) {
  try {
    const { data } = await client.put(`/tasks/${id}`, payload);
    return data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}

export async function deleteTask(id) {
  try {
    const { data } = await client.delete(`/tasks/${id}`);
    return data.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
