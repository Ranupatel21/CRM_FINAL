import Lead from "./lead.model.js";
import Vehicle from "./vehicle.model.js";
import Booking from "./booking.model.js";
import Quotation from "./quotation.model.js";
import TestDrive from "./testdrive.model.js";
import Inventory from "./inventory.model.js";
import Finanace from "./finance.model.js"
export {
  Lead,
  Vehicle,
  Booking,
  Quotation,
  TestDrive,
  Inventory,
  Finanace
};

 //import express from "express";
// import { Lead } from "../models/lead.model.js";

// const router = express.Router();

// // ✅ GET ROUTE (This fixes "Cannot GET /api/leads")
// router.get("/", async (req, res) => {
//   try {
//     const leads = await Lead.find();
//     res.json(leads);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ POST ROUTE
// router.post("/", async (req, res) => {
//   try {
//     const lead = await Lead.create(req.body);
//     res.json(lead);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });