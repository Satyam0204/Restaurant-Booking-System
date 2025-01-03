"use client";

import React from "react";

const BookingForm = ({ bookingObj, setBookingObj, onBookingSuccess }) => {
  const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "contact") {
      const numericValue = value.replace(/\D/g, ""); 
      if (numericValue.length <= 10) {
        setBookingObj((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setBookingObj((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${backendUri}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingObj),
      });

      const data = await res.json();
      if (data.success) {
        console.log(data);
        onBookingSuccess(data.booking);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to Book");
    }
  };

  return (
    <div>
      <form className="space-y-4 p-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={bookingObj?.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Phone No.</label>
          <input
            type="text"
            name="contact"
            value={bookingObj?.contact}
            onChange={handleChange}
            maxLength="10" // Restricts input to 10 characters
            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            pattern="^\d{10}$" // Ensures only numbers with exactly 10 digits
            title="Please enter a valid 10-digit phone number"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Book Table
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
