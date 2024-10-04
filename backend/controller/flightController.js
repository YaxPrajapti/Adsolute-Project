const mongoose = require("mongoose");
const Booking = require("../models/bookingSchema");
const redisCache = require("../Redis/cache");

/*
bookingDetails: {
    username: 'yax123',
    flightId: 'FL12345',
    departurePlace: 'New York',
    arrivalPlace: 'Los Angeles',
    departureTime: '2024-10-10T08:00:00.000Z',
    arrivalTime: '2024-10-10T12:00:00.000Z',
    seatsBooked: 2,
    totalPrice: 500
  }
*/
module.exports.bookFlight = async (req, res, next) => {
  const bookingDetails = req.body.bookingDetails;
  if (!bookingDetails) {
    return res.status(400).send({ message: "Booking data is required" });
  }
  const newBooking = new Booking({
    username: bookingDetails.username,
    flightId: bookingDetails.flightId,
    departurePlace: bookingDetails.departurePlace,
    arrivalPlace: bookingDetails.arrivalPlace,
    departureTime: bookingDetails.departureTime,
    arrivalTime: bookingDetails.arrivalTime,
    seatsBooked: bookingDetails.seatsBooked,
    totalPrice: bookingDetails.totalPrice,
    bookingDate: new Date(),
  });
  try {
    const newSavedBooking = await newBooking.save();
    await redisCache.cacheBooking(newSavedBooking.username, newSavedBooking);
    return res
      .status(200)
      .send({ message: "booking successfully", booking: newSavedBooking });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error while saving the data", err: error.message });
  }
};

module.exports.getBookings = async (req, res, next) => {
  try {
    const { username } = req.body;
    let cached_bookings = await redisCache.getBookings(username);
    if (cached_bookings) {
      cached_bookings = JSON.parse(cached_bookings);
      console.log("Bookings found in Redis cache.");
      return res.status(200).send({
        message: "Bookings fetched successfully from cache",
        bookings: cached_bookings,
      });
    }
    const bookings = await Booking.find({ username: username }).sort({
      bookingDate: -1,
    });
    if (bookings && bookings.length > 0) {
      await redisCache.cacheBooking(username, JSON.stringify(bookings));
      return res.status(200).send({
        message: "Bookings fetched successfully from MongoDB",
        bookings: bookings,
      });
    }
    return res
      .status(204)
      .send({ message: "No bookings were found for this user" });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Error while fetching bookings", err: error.message });
  }
};
