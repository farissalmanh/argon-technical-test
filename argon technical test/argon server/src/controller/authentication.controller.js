const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const { Jwt } = require("../helpers");
const { Authentication, Employee } = require("../repositories");
const saltRounds = 10;

async function login(req, res, next) {
  try {
    const { email, password, isAdmin } = req.body;

    const where = {
      Username: email,
      IsAdmin: isAdmin
    }
    const [userDetail] = await Authentication.getUser(where);
    const match = await bcrypt.compare(password, userDetail.Password);

    if(match) {
      const whereEmployee = {
        EmployeeEmail: email
      }
      const [ employeeDetail ] = await Employee.getEmployeeProfile(whereEmployee);
      delete employeeDetail.EmployeePhotos;

      const accessToken = Jwt.sign(employeeDetail);
      const cookieObj = {
        httpOnly: true,
        maxAge: 3600
      }
      res.cookie("token", accessToken, cookieObj)
      return res.json({ status: "success", accessToken, employeeDetail });
    }

    return res.json({ status: "failed", message: "Invalid Credentials" });
  } catch (error) {
    next(error);
  }
}

async function addUser(req, res, next) {
  try {
    const {
      username,
      password,
      employeeName,
      employeeEmail,
      employeePhone,
      employeePosition,
      employeePhotos,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const dataUser = {
      Username: username,
      Password: hashPassword,
      IsAdmin: 0,
    }
    const dataEmployee = {
      EmployeeName: employeeName,
      EmployeeEmail: employeeEmail,
      EmployeePhone: employeePhone,
      EmployeePosition: employeePosition,
      EmployeePhotos: employeePhotos,
    }

    await Authentication.createUser(dataUser);
    await Employee.createEmployeeProfile(dataEmployee);

    res.status(httpStatus.OK).json({ message: "success create user" });
  } catch (error) {
    next(error);
  }
}

async function checkLogin(req, res, next) {
  try {
    const { token } = req.body;
    const payload = Jwt.validateToken(token);
    if(payload) return res.json({ status: true, payload });
    return res.json({ status: false, message: "Token not valid" });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  addUser,
  checkLogin,
};
