"use client";

import { useState } from "react";

const AvailabilityForm = ({ onCheckAvailability }) => {
  const [formData, setFormData] = useState({
    date: "",
    guests: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckAvailability(formData);
    setFormData({ date: "", guests: 1 });
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className="border w-full sm:w-3/5 flex flex-col justify-center items-center py-6 px-4">
      <div className="text-slate-200 text-center m-4 text-xl sm:text-2xl">
        Book A Table
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full sm:w-4/5">
        <div>
          <label className="text-slate-300 mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            min={today}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="text-slate-300 mb-1 font-medium">Guests</label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1" // Minimum value is 1
            max="32" // Maximum value is 32
            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Check Availability
        </button>
      </form>
    </div>
  );
};

export default AvailabilityForm;
