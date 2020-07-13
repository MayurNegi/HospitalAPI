constjwt = require("jsonwebtoken");
const Doctor = require("../../models/doctor");

module.exports.doctorRegistration = async function (req, res) {
  try {
    // if password and confirm pasword is not same
    if (req.body.password != req.body.confirm) {
      return res.status(422).json({
        message: "password and confirm password dosent match",
      });
    }

    let doctor = await Doctor.findOne({ email: req.body.email });
    if (!doctor) {
      // create doctor if not already exist
      await Doctor.create(req.body);

      return res.status(200).json({
        message: "New Doctor Registered",
      });
    } else {
      // when doctor already exist
      return res.status(409).json({
        message: "A doctor already exist with same email id",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};
