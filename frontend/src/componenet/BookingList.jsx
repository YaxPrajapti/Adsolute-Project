import React, { useState } from "react";

const BookingList = () => {
  const [username, setUsername] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "http://localhost:8080/api/flight/fetch-bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookings(data.bookings || []);
      } else if (response.status === 204) {
        setBookings([]);
        setError("No bookings found for this user.");
      } else {
        const result = await response.json();
        setError(result.message || "Error fetching bookings");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      fetchBookings(); // Fetch bookings when form is submitted
    }
  };

  return (
    <div>
      <h1>Fetch Booking Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Bookings"}
        </button>
      </form>

      {error && <p>{error}</p>}

      {bookings.length > 0 && (
        <div>
          <h2>Bookings for {username}</h2>
          <ul>
            {bookings.map((booking, index) => (
              <li key={index}>
                <p>Flight ID: {booking.flightId}</p>
                <p>Departure: {booking.departurePlace}</p>
                <p>Arrival: {booking.arrivalPlace}</p>
                <p>Seats Booked: {booking.seatsBooked}</p>
                <p>Total Price: {booking.totalPrice}</p>
                <p>
                  Booking Date: {new Date(booking.bookingDate).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bookings.length === 0 && !loading && !error && (
        <p>No bookings to display.</p>
      )}
    </div>
  );
};

export default BookingList;
