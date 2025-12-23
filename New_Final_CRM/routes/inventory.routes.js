import express from "express";
import { Inventory } from "../models/inventory.model.js";
import multer from "multer";
import xlsx from "xlsx";


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/inventory", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Excel file required" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    for (const item of sheetData) {
      const {
        chachesNumber,
        brand,
        model,
        variant,
        color,
        quantity,
        price
      } = item;

      if (!chachesNumber || !model || !variant || !color || !price) continue;

      const inventory = await Inventory.findOne({ chachesNumber });

      if (inventory) {
        inventory.quantity += Number(quantity || 0);
        inventory.price = price;
        inventory.status =
          inventory.quantity > 0 ? "In Stock" : "Out of Stock";
        await inventory.save();
      } else {
        await Inventory.create({
          chachesNumber,
          brand,
          model,
          variant,
          color,
          quantity: Number(quantity),
          price,
          status: quantity > 0 ? "In Stock" : "Out of Stock"
        });
      }
    }

    res.json({
      message: "Excel inventory uploaded successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Excel upload failed",
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