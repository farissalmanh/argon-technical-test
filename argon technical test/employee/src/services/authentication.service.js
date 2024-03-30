import axios from "../helpers/http-common";

export const loginUser = async (data) => {
  const response = await axios.post(`/attendance/authentication/login`, data);
  return response.data;
};

export const validateToken = async (token) => {
  const response = await axios.post(`/attendance/authentication/check-login`, {token});
  return response.data;
};