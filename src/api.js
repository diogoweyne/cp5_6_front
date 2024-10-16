import axios from 'axios';

const API_URL = 'https://todo-caio.azurewebsites.net/api';

export const fetchTargets = () => axios.get(`${API_URL}/targets`);
export const fetchTodosByTarget = (targetId) => axios.get(`${API_URL}/todos?targetId=${targetId}`);
export const fetchAllTodos = () => axios.get('https://todo-caio.azurewebsites.net/api/Todo')
export const createTarget = (data) => axios.post(`${API_URL}/targets`, data);
export const createTodo = (data) => axios.post(`${API_URL}/todos`, data);
export const updateTarget = (targetId, data) => axios.put(`${API_URL}/targets/${targetId}`, data);
export const updateTodo = (todoId, data) => axios.put(`${API_URL}/todos/${todoId}`, data);
export const deleteTarget = (targetId) => axios.delete(`${API_URL}/targets/${targetId}`);
export const deleteTodo = (todoId) => axios.delete(`https://todo-caio.azurewebsites.net/api/Todo/${todoId}`);
