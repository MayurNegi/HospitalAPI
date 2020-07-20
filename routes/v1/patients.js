const express = require("express");
const router = express.Router();

const patientsController = require("../../controllers/v1/patientsController");

router.post("/register", patientsController.patientRegister);

module.exports = router;
