const express = require("express");
const router = express.Router();

const { Employee } = require("../controller");

router.get("/employee-profile", Employee.getEmployeeProfile);
router.post("/employee-profile", Employee.createEmployeeProfile);
router.put("/employee-profile", Employee.updateEmployeeProfile);
router.get("/employee-attendance", Employee.getEmployeeAttendance);
router.post("/check-in-out", Employee.checkInOut);

module.exports = router;