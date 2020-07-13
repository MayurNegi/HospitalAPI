constjwt = require("jsonwebtoken");
const Doctor = require("../../models/doctor");
const { ExtractJwt } = require("passport-jwt");

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

module.exports.login = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ email: req.body.email });
    // if password is incorrect or user is not registered
    if (!doctor || doctor.password != req.body.password) {
      return res.status(422).json({
        message: "invalid username or password",
      });
    }

    // login the user
    return res.status(200).json({
      message: "login successfully",
      data: {
        token: jwt.sign(doctor.toJSON(), "secret", { expiresIn: 100000 }),
      },
    });
  } catch (err) {
    console.log("error", err);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
