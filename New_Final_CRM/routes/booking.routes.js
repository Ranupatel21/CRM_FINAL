import express from "express";
import { Booking } from "../models/booking.model.js";
import { Inventory } from "../models/inventory.model.js";

const router = express.Router();

//  CREATE BOOKING

router.post("/", async (req, res) => {
  try {
    const { brand, model, variant, color } = req.body;

    const stock = await Inventory.findOne({
      brand,
      model,
      variant,
      color,
      quantity: { $gt: 0 }
    });

    if (!stock) {
      return res.status(400).json({
        message: "Selected vehicle is out of stock"
      });
    }

    const createdBooking = await Booking.create(req.body);

    stock.quantity -= 1;
    await stock.save();

    res.status(201).json(createdBooking);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//  GET ALL BOOKINGS
router.get("/", async (req, res) => {
  try {
    const allBookings = await Booking.find();
    res.status(200).json(allBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;

