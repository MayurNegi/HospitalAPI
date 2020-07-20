const express = require("express");
const router = express.Router();

const patientsController = require("../../controllers/v1/patientsController");

router.post("/register", patientsController.patientRegister);

router.post("/:id/create_report", patientsController.createReport);

module.exports = router;
