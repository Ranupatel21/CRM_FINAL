import express from "express";
import { Vehicle } from "../models/vehicle.model.js";

const router = express.Router();

// GET ALL VEHICLES
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  CREATE VEHICLE
router.post("/", async (req, res) => {
  try {
    const createdVehicle = await Vehicle.create(req.body);
    res.status(201).json(createdVehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ THIS LINE FIXES YOUR ERROR
export default router;
