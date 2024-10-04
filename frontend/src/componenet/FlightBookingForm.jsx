import React, { useState } from "react";

const FlightBookingForm = () => {
  const initialData = {
    username: "",
    flightId: "",
    departurePlace: "",
    arrivalPlace: "",
    departureTime: "",
    arrivalTime: "",
    seatsBooked: 1,
    totalPrice: 0,
  };
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/flight/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingDetails: formData,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Flight booked successfully!");
        setFormData(initialData);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Flight ID:</label>
        <input
          type="text"
          name="flightId"
          value={formData.flightId}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Departure Place:</label>
        <input
          type="text"
          name="departurePlace"
          value={formData.departurePlace}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Arrival Place:</label>
        <input
          type="text"
          name="arrivalPlace"
          value={formData.arrivalPlace}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Departure Time:</label>
        <input
          type="datetime-local"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Arrival Time:</label>
        <input
          type="datetime-local"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Seats Booked:</label>
        <input
          type="number"
          name="seatsBooked"
          value={formData.seatsBooked}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Total Price:</label>
        <input
          type="number"
          name="totalPrice"
          value={formData.totalPrice}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Book Flight</button>
    </form>
  );
};

export default FlightBookingForm;
