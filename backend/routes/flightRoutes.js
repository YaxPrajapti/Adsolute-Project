const express = require("express");
const flightControler = require("../controller/flightController");

const router = express.Router();

router.post("/book", flightControler.bookFlight);
router.post("/fetch-bookings", flightControler.getBookings);

module.exports = router;
