module.exports = {
  Lead: require("./lead.model").default,
  Vehicle: require("./vehicle.model"), 
  Booking: require("./booking.model"),
  Quotation: require("./quotation.model"),
  TestDrive: require("./testdrive.model").default,
};
import express from "express";
import { Lead } from "../models/lead.model.js";

const router = express.Router();

// ✅ GET ROUTE (This fixes "Cannot GET /api/leads")
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST ROUTE
router.post("/", async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});