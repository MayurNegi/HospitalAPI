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
