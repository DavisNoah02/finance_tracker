import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getExpenses = async (token) => {
  const response = await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addExpense = async (expense, token) => {
  const response = await axios.post(`${API_URL}/expenses`, expense, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteExpense = async (id, token) => {
  const response = await axios.delete(`${API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};