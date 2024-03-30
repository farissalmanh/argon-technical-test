var DataTypes = require("sequelize").DataTypes;
var _employeeattendance = require("./employeeattendance");
var _employee = require("./employee");
var _user = require("./user");

function initModels(sequelize) {
  var employeeattendance = _employeeattendance(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  employeeattendance.belongsTo(employee, { as: "Employee", foreignKey: "EmployeeId"});
  employee.hasMany(employeeattendance, { as: "employeeattendances", foreignKey: "EmployeeId"});

  return {
    employeeattendance,
    employee,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
