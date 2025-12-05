import express from "express";
import { Quotation } from "../models/quotation.model.js";

const router = express.Router();

// GET ALL QUOTATIONS
router.get("/", async (req, res) => {
  try {
    const quotations = await Quotation.find();   //  variable name fixed
    res.json(quotations);                        //  correct response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE NEW QUOTATION
router.post("/", async (req, res) => {
  try {
    const createdQuotation = await Quotation.create(req.body);  //  fixed
    res.status(201).json(createdQuotation);                     //  correct response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
