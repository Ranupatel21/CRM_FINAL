import express from "express";
import { TestDrive } from "../models/testdrive.model.js";  // ONLY MODEL IMPORT

const router = express.Router();

//  GET
router.get("/", async (req, res) => {
  try {
    const data = await TestDrive.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST
router.post("/", async (req, res) => {
  try {
    const created = await TestDrive.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DEFAULT EXPORT
export default router;


