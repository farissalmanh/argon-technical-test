const express = require("express");

const employeeRoute = require("./employee.route");
const loginRoute = require("./login.route");

require("dotenv").config();

const router = express.Router();

router.get("/testApi", (req, res) => {
  return res.status(200).json("Employee Absent Connected");
});

const defaultRoutes = [
  {
    path: "/employee",
    route: employeeRoute,
  },
  {
    path: "/authentication",
    route: loginRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
