import express from "express";
import { Inventory } from "../models/inventory.model.js";

const router = express.Router();

// Add New Inventory Item
// router.post("/add", async (req, res) => {
//   try {
//     const data = await Inventory.create(req.body);
//     res.status(201).json({ message: "Inventory added", data });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
router.post("/inventory", async (req, res) => {
  const { brand, model, variant, color, quantity, price } = req.body;

  const existingStock = await Inventory.findOne({
    brand, model, variant, color
  });

  if (existingStock) {
    existingStock.quantity += quantity;
    if (price) existingStock.price = price;
    await existingStock.save();

    return res.json({
      message: "Stock updated",
      stock: existingStock
    });
  }

  const newStock = await Inventory.create(req.body);
  res.status(201).json(newStock);
});

// Get ALL Inventory (Excel type list)
router.get("/", async (req, res) => {
  try {
    const items = await Inventory.find().sort({ updatedAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Inventory Quantity
router.put("/update/:id", async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Inventory updated", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Item
router.delete("/delete/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Inventory item deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get brand 
router.get("/dropdown/brands", async(req, res) =>{
  const brands = await Inventory.distinct("brand",{quantity: {$gt:0}});
  res.json(brands);
});
// Get model
router.get("/dropdown/models", async (req, res) => {
  const { brand } = req.query;
  const models = await Inventory.distinct("model", {
    brand,
    quantity: { $gt: 0 }
  });
  res.json(models);
});
// get color
router.get("/dropdown/colors", async (req, res) => {
  const { brand, model, variant } = req.query;
  const colors = await Inventory.distinct("color", {
    brand,
    model,
    variant,
    quantity: { $gt: 0 }
  });
  res.json(colors);
});



export default router;
