import express from "express";
import { Booking } from "../models/booking.model.js";
import {Cars} from "../models/car.model.js"
const router = express.Router();

// Brand dropdown
router.get("/cars/brands", async (req, res) => {
  const brands = await Cars.distinct("brand");
  res.json(brands);
});

// Model dropdown
router.get("/cars/models", async (req, res) => {
  const { brand } = req.query;
  const models = await Cars.distinct("model", { brand });
  res.json(models);
});

// Variant dropdown
router.get("/cars/variants", async (req, res) => {
  const { brand, model } = req.query;
  const variants = await Cars.distinct("variant", { brand, model });
  res.json(variants);
});

// Color dropdown
router.get("/cars/colors", async (req, res) => {
  const { brand, model, variant } = req.query;
  const colors = await Cars.distinct("color", {
    brand,
    model,
    variant
  });
  res.json(colors);
});
// Get all Bookings
router.get("/bookings", async (req, res) => {
  const allBookings = await Booking.find()
  res.json(allBookings);
});

// Create booking
router.post("/bookings", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

export default router;



