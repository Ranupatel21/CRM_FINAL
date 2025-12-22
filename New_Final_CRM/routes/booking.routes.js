import express from "express";
import { Booking } from "../models/booking.model.js";

const router = express.Router();

// GET ALL BOOKINGS
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// CREATE BOOKING
router.post("/", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

export default router;
