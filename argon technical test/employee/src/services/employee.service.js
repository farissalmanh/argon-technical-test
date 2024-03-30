import axios from "../helpers/http-common";

export const getEmployeeProfile = async (mainFilter) => {
  const response = await axios.get(`/attendance/employee/employee-profile`, {
    params: mainFilter,
  });
  return response.data;
};

export const updateEmployeeProfile = async (data) => {
  const response = await axios.put(
    `/attendance/employee/employee-profile`,
    data
  );
  return response.data;
};

export const getAttendance = async (data = {}) => {
  const response = await axios.get(`/attendance/employee/employee-attendance`, {
    params: data,
  });
  return response.data;
};

export const updateAbsent = async (data) => {
  const response = await axios.post(`/attendance/employee/check-in-out`, data);
  return response.data;
};
