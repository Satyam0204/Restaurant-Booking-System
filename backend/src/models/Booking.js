const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  timeSlot: { type: String, required: true }, 
  guests: { type: Number, required: true },
  name: { type: String, required: true },
  contact: { 
    type: String, 
    required: true, 
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`
    }
  },
  tableNumber: [{ type: Number, required: true }],
});

module.exports = mongoose.model("Booking", bookingSchema);
