import axios from "axios";

const Base_URL = "https://jsonplaceholder.typicode.com";

export const getUser = async () => {
  const response = await axios.get(`${Base_URL}/users`);
  return response;
};

export const addUser = async (payload) => {
  const response = await axios.post(`${Base_URL}/users`, payload);
  return response;
};

export const updateUser = async (userId, payload) => {
  const response = await axios.put(`${Base_URL}/users/${userId}`, payload);
  return response;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${Base_URL}/users/${userId}`);
  return response;
};
