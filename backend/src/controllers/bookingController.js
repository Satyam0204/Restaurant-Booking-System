const Booking = require("../models/Booking");

const generateTimeSlots = () => {
  return [
    "09:00-11:00",
    "11:00-13:00",
    "13:00-15:00",
    "15:00-17:00",
    "17:00-19:00",
    "19:00-21:00",
    "21:00-23:00",
    "23:00-00:00"
  ];
};

const calculateAvailableTables = (occupiedTables, totalTables = 8) => {
  const allTables = Array.from({ length: totalTables }, (_, i) => i + 1);
  return allTables.filter((table) => !occupiedTables.includes(table));
};

exports.checkAvailability = async (req, res) => {
  const { date, guests } = req.body;

  const timeSlots = generateTimeSlots();

  // Validate input
  if (!date || !guests) {
    return res
      .status(400)
      .json({ success: false, message: "Date and guests are required" });
  }

  try {
    const requiredTables = Math.ceil(guests / 4);
    const unavailableSlots = [];

    // Check each time slot for availability
    for (const timeSlot of timeSlots) {
      const existingBookings = await Booking.find({ date, timeSlot });

      const occupiedTables = existingBookings.flatMap((b) => b.tableNumber);
      const availableTables = calculateAvailableTables(occupiedTables);

      if (availableTables.length < requiredTables) {
        unavailableSlots.push(timeSlot);
      }
    }

    // Filter out unavailable time slots
    const availableSlots = timeSlots.filter(
      (slot) => !unavailableSlots.includes(slot)
    );

    res.status(200).json({
      success: true,
      availableSlots,
      message: "Available time slots fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBooking = async (req, res) => {
  const { date, timeSlot, guests, name, contact } = req.body;

  const timeSlots = generateTimeSlots();
  if (!date || !timeSlot || !guests || !name || !contact) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (!timeSlots.includes(timeSlot)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid time slot" });
  }

  try {
    const requiredTables = Math.ceil(guests / 4);
    const existingBookings = await Booking.find({ date, timeSlot });

    const occupiedTables = existingBookings.flatMap((b) => b.tableNumber);
    const availableTables = calculateAvailableTables(occupiedTables);

    if (availableTables.length < requiredTables) {
      return res
        .status(400)
        .json({ success: false, message: "No slots available" });
    }

    const assignedTables = availableTables.slice(0, requiredTables);
    const booking = new Booking({
      date,
      timeSlot,
      guests,
      name,
      contact,
      tableNumber: assignedTables,
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookings = async (req, res) => {
  const { date, timeSlot } = req.query;

  try {
    const query = {};
    if (date) query.date = date;
    if (timeSlot) query.timeSlot = timeSlot;

    const bookings = await Booking.find(query);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
      deletedBooking: booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
