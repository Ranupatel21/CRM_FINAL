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
  try {
    const { brand, model, variant, color, quantity, price } = req.body;

    const inventory = await Inventory.findOne({
      brand, model, variant, color
    });

    if (inventory) {
      inventory.quantity += Number(quantity);
      if (price) inventory.price = price;
      await inventory.save();

      return res.status(200).json({
        message: "Stock updated",
        stock: inventory
      });
    }

    const newStock = await Inventory.create({
      brand,
      model,
      variant,
      color,
      quantity: Number(quantity),
      price
    });

    res.status(201).json(newStock);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Inventory error",
      error: error.message
    });
  }
});


// Get ALL Inventory (Excel type list)
router.get("/inventory", async (req, res) => {
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
export default router;