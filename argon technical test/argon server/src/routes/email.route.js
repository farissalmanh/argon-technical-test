const express = require("express");
const router = express.Router();

const { Email } = require("../controller");

router.get("/send-email", Email.sendEmail);
router.get("/render-view", Email.renderViewConfirmation);
router.get("/ktu-status", Email.getKtuStatus);
router.post("/confirm-activity", Email.confirmedActivity);

module.exports = router;