"use client";

import { useState } from "react";
import BookingForm from "./BookingForm";

const TimeSlotSelector = ({
  availableSlots,
  bookingObj,
  setBookingObj,
  onBookingSuccess,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setBookingObj((prev) => ({
      ...prev,
      timeSlot: slot,
    }));
  };

  return (
    <>
      <div className="">
        <div className="text-lg font-medium">Available Time Slots</div>
        {availableSlots.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-4 justify-center align-middle">
            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleSlotSelection(slot)}
                className={`border rounded-lg px-4 py-2 ${
                  selectedSlot === slot
                    ? "bg-green-700 text-white"
                    : "border-green-600 text-green-600 hover:bg-green-700 hover:text-white"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-red-500">
            No available slots for the selected date and guests.
          </p>
        )}
      </div>
      <BookingForm
        bookingObj={bookingObj}
        setBookingObj={setBookingObj}
        onBookingSuccess={onBookingSuccess}
      />
    </>
  );
};

export default TimeSlotSelector;
