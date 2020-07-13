const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    doctor: {
      type: String,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
