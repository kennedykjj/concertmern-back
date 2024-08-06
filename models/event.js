const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Event name is required"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: "Event date must be in the future",
    },
  },
  location: {
    type: String,
    required: [true, "Event location is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
  },
});

module.exports = mongoose.model("Event", eventSchema);
