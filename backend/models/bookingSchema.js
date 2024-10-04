const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  flightId: {
    type: String,
    required: true,
  },
  departurePlace: {
    type: String,
    required: true,
  },
  arrivalPlace: {
    type: String,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  seatsBooked: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
