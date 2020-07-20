const Patient = require("../../models/patient");
const Report = require("../../models/report");

// patient registration
module.exports.patientRegister = async function (req, res) {
  try {
    //check if the patient is already registered with give mobile no.
    let patient = await Patient.findOne({ mobile: req.body.mobile });
    if (!patient) {
      console.log(req.body);
      await Patient.create(req.body);
      return res.status(200).json({
        message: "new patient registered",
      });
    } else {
      return res.status(409).json({
        message: "this mobile number already exist",
        patient: patient,
      });
    }
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async function (req, res) {
  try {
    // create report
    let patient = await Patient.findById(req.params.id);
    if (patient) {
      let report = await Report.create({
        doctor: "bob",
        patient: req.params.id,
        status: req.body.status,
        date: req.body.date,
      });
      patient.reports.push(report);
      patient.save();
      return res.status(200).json({
        message: "report created",
      });
    } else {
      return res.status(409).json({
        message: "this patient is not registered",
      });
    }
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
