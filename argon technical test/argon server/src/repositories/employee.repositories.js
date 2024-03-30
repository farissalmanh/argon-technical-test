const { argon } = require("../models");

async function getEmployeeProfile(where) {
  const employeeProfile = await argon.models.employee.findAll({ where, raw: true });
  return employeeProfile;
}

async function createEmployeeProfile(data) {
  const employeeProfile = await argon.models.employee.create(data);
  return employeeProfile;
}

async function updateEmployeeProfile(data, where) {
  const employeeProfile = await argon.models.employee.update(data, {
    where,
  });
  return employeeProfile;
}

async function getEmployeeAttendance(where) {
  const employeeAttendance = await argon.models.employeeattendance.findAll({
    where,
    include: {
      model: argon.models.employee, as: "Employee",
    },
    order: [["CreatedAt", "DESC"]]
  });
  return employeeAttendance;
}

async function createCheckInOut(data) {
  const employeeAttendance = await argon.models.employeeattendance.create(data);
  return employeeAttendance;
}

async function updateCheckInOut(data, where) {
  const employeeAttendance = await argon.models.employeeattendance.update(data, {
    where,
  });
  return employeeAttendance;
}

module.exports = {
  getEmployeeProfile,
  createEmployeeProfile,
  updateEmployeeProfile,
  getEmployeeAttendance,
  createCheckInOut,
  updateCheckInOut,
};
