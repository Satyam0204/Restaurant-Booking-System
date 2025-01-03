const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeSlot: { type: String, required: true }, // Changed from 'time' to 'timeSlot'
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  tableNumber: [{ type: Number, required: true }],
});

module.exports = mongoose.model("Booking", bookingSchema);