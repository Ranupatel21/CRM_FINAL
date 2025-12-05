// import { Router } from "express";
// import { Lead } from "../models/lead.model.js";

// const router = Router();

// // GET all leads
// router.get("/", async (req, res) => {
//   try {
//     const all = await Lead.find();
//     res.json(all);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // CREATE new lead
// router.post("/", async (req, res) => {
//   try {
//     const created = await Lead.create(req.body);
//     res.json(created);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;



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

export default router;