const express = require("express");
const router = express.Router();

const { Authentication } = require("../controller");

router.post("/login", Authentication.login);
router.post("/create-user", Authentication.addUser);
router.post("/check-login", Authentication.checkLogin);

module.exports = router;