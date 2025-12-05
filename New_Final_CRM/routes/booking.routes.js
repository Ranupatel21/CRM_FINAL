import express from "express";
import { Booking } from "../models/booking.model.js";

const router = express.Router();

// ✅ GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const allBookings = await Booking.find();
    res.status(200).json(allBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const createdBooking = await Booking.create(req.body);
    res.status(201).json(createdBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

