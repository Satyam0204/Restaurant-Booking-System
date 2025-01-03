"use client";

import { useState } from "react";

import TimeSlotSelector from "@/components/TimeSlotSelector";
import AvailabilityForm from "@/components/AvailabilityForm";
import Modal from "@/components/Modal";

const HomePage = () => {
  const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;

  const [isModalOpen, setModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState();
  const [bookingObj, setBookingObj] = useState({
    name: "",
    contact: "",
    date: "",
    timeSlot: "",
    guests: 1,
  });

  const [bookingDetails, setBookingDetails] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setBookingDetails(null); 
  };

  const handleBookingSuccess = (details) => {
    setBookingDetails(details);
  };

  const checkAvailability = async (formData) => {
    handleOpenModal();
    try {
      const res = await fetch(
        `${backendUri}/bookings/check-availability`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setAvailableSlots(data.availableSlots);
        setBookingObj({
          name: "",
          contact: "",
          date: formData.date,
          timeslot: "",
          guests: formData.guests,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to check availability.");
    }
  };

  return (
    <div>
      <div className="flex flex-col h-[80vh]">
        <div className="flex w-full justify-end h-full">
          <div className="flex flex-col justify-center items-center w-full sm:w-1/2 px-4">
            <h1 className="text-3xl sm:text-5xl m-4 text-center text-slate-200 font-bold">
              The Royal Restaurant
            </h1>
            <div className="text-lg text-slate-300 p-4 flex w-full sm:w-4/6 text-center">
              A Feast for Your Senses Welcome to Royal Restaurant, where every
              meal is an experience, every flavor tells a story, and every visit
              feels like coming home. Nestled in the heart of Asansol, we offer
              a unique culinary journey that blends tradition and innovation.
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end h-full">
          <div className="flex flex-col justify-center items-center w-full sm:w-1/2 px-4">
            <AvailabilityForm onCheckAvailability={checkAvailability} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {bookingDetails ? (
            <div className="p-4">
              <h2 className="text-lg font-medium text-green-600">
                Booking Confirmed!
              </h2>
              <p>Booking ID: {bookingDetails._id}</p>
              <p>Date: {bookingDetails.date}</p>
              <p>Time Slot: {bookingDetails.timeSlot}</p>
              <p>Guests: {bookingDetails.guests}</p>
              <p>Name: {bookingDetails.name}</p>
              <p>Contact: {bookingDetails.contact}</p>
              <p>Table Numbers: {bookingDetails.tableNumber.join(", ")}</p>
            </div>
          ) : (
            <TimeSlotSelector
              availableSlots={availableSlots}
              bookingObj={bookingObj}
              setBookingObj={setBookingObj}
              onBookingSuccess={handleBookingSuccess}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
