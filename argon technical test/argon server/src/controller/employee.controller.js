const httpStatus = require("http-status");
const dayjs = require("dayjs");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const { sendPushNotification } = require("../firebase/firebaseAdmin");
const { Employee, Authentication } = require("../repositories");
const { sendMessage } = require("../queue/publisher");
const saltRounds = 10;

require("dotenv").config();

async function getEmployeeProfile(req, res, next) {
  try {
    const { EmployeeEmail } = req.query;
    let whereEmployee = {};
    let whereUser = {};
    if (EmployeeEmail) {
      whereEmployee = {
        EmployeeEmail,
      };
      whereUser = {
        Username: EmployeeEmail,
      };
    }

    const employeeProfile = await Employee.getEmployeeProfile(whereEmployee);
    await Authentication.getUser(whereUser);
    res
      .status(httpStatus.OK)
      .json({ data: employeeProfile, message: "success getEmployeeProfile" });
  } catch (error) {
    next(error);
  }
}

async function updateEmployeeProfile(req, res, next) {
  try {
    const {
      EmployeeEmail,
      EmployeePhone,
      EmployeePosition,
      EmployeePhotos,
      Password,
    } = req.body;
    const dataEmployee = {
      EmployeePosition,
      EmployeePhone,
      EmployeePhotos,
    };
    const whereEmployee = {
      EmployeeEmail,
    };

    if (Password) {
      const hashPassword = await bcrypt.hash(Password, saltRounds);

      const dataUser = {
        Password: hashPassword,
      };
      const whereUser = {
        Username: EmployeeEmail,
      };

      await Authentication.updateUser(dataUser, whereUser);
    }
    const isUpdateDetailSuccess = await Employee.updateEmployeeProfile(
      dataEmployee,
      whereEmployee
    );
    const token =
      "eivZU8Rf2dpOBt8LzRVSeY:APA91bHm9qACHwUb7FAsFk2mmtdB85ffjrhwYB70CAieoxacWc1TJV7AzjHNkND3JyOvs88ldPbbUZ89bL6643-CWxE8FeMomVXYGF7QnRKGwfumcvM9zUxfWeTcnw6bZr6FBqUTDFEW";
    await sendPushNotification(
      token,
      "Update Data",
      `${EmployeeEmail} telah update data`
    );
    await sendMessage(`${EmployeeEmail} telah update data`);

    if (isUpdateDetailSuccess) {
      return res.status(httpStatus.OK).json({
        status: "success",
        message: "success updateEmployeeProfile",
      });
    }
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "failed",
      message: "failed updateEmployeeProfile",
    });
  } catch (error) {
    next(error);
  }
}

async function createEmployeeProfile(req, res, next) {
  try {
    const {
      EmployeeName,
      EmployeeEmail,
      EmployeePhone,
      EmployeePosition,
      EmployeePhotos,
      Password,
    } = req.body;
    const dataEmployee = {
      EmployeeName,
      EmployeeEmail,
      EmployeePhone,
      EmployeePosition,
      EmployeePhotos,
    };
    const hashPassword = await bcrypt.hash(Password, saltRounds);

    const dataUser = {
      Username: EmployeeEmail,
      Password: hashPassword,
      IsAdmin : 0,
    };

    const createEmployee = await Employee.createEmployeeProfile(dataEmployee);
    const createUser = await Authentication.createUser(dataUser);

    if (createEmployee && createUser) {
      return res.status(httpStatus.OK).json({
        status: "success",
        message: "success createEmployeeProfile",
      });
    }
    return res.status(httpStatus.BAD_REQUEST).json({
      status: "failed",
      message: "failed createEmployeeProfile",
    });
  } catch (error) {
    next(error);
  }
}

async function getEmployeeAttendance(req, res, next) {
  try {
    let mainFilter = JSON.parse(JSON.stringify(req.query));
    mainFilter.startDate = dayjs(mainFilter.startDate).format("YYYY-MM-DD");
    mainFilter.endDate = dayjs(mainFilter.endDate).format("YYYY-MM-DD");
    let where = {};

    const conf = {
      startDate: ">=", 
      endDate: "<=", 
      currentDate: "="
    }

    for (const [key, value] of Object.entries(mainFilter)) {
      if(key){
        if(key === "employeeId"){
          where = {
            ...where,
            EmployeeId: value,
          }
          continue;
        }
        where = {
          ...where,
          [key]: sequelize.where(
            sequelize.fn("date", sequelize.col("employeeattendance.CreatedAt")),
            conf[key],
            value
          ),
        }
      }
    }

    const employeeAttendance = await Employee.getEmployeeAttendance(where);
    res.status(httpStatus.OK).json({
      data: employeeAttendance,
      message: "success getEmployeeAttendance",
    });
  } catch (error) {
    next(error);
  }
}

async function checkInOut(req, res, next) {
  try {
    const { status, isExist, employeeId } = req.body;
    const currentDate = dayjs().format("YYYY-MM-DD");
    const currentDatetime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    let data = {
      EmployeeId: employeeId,
    };

    data[status === "Masuk" ? "EmployeeCheckIn" : "EmployeeCheckOut"] = currentDatetime;
    let where = {
      where: sequelize.where(
        sequelize.fn("date", sequelize.col("CreatedAt")),
        "=",
        currentDate
      ),
      EmployeeId: employeeId,
    };

    if (isExist) {
      await Employee.updateCheckInOut(data, where);
    } else {
      await Employee.createCheckInOut(data);
    }
    res
      .status(httpStatus.OK)
      .json({ status: "success", message: `Berhasil Absen ${status}` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEmployeeProfile,
  updateEmployeeProfile,
  createEmployeeProfile,
  getEmployeeAttendance,
  checkInOut,
};
