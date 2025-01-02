const express = require("express");
const { createBooking, getBookings, checkAvailability, deleteBooking } = require("../controllers/bookingController");

const router = express.Router();

router.get("/",checkAvailability);
router.post("/", createBooking); 
router.get("/getAllBookings", getBookings);    
router.delete("/:id", deleteBooking);
module.exports = router;
