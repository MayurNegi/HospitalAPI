const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  registration_no: {
    type: String,
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
