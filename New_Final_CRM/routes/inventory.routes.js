import express from "express";
import { Inventory } from "../models/inventory.model.js";
import multer from "multer";
import xlsx from "xlsx";


const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), async (req, res) => {
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


// 📤 EXPORT INVENTORY TO EXCEL
router.get("/export/excel", async (req, res) => {
  try {
    const inventory = await Inventory.find().lean();

    if (!inventory.length) {
      return res.status(404).json({ message: "No inventory data found" });
    }

    // 👉 JSON → Excel Sheet
    const worksheet = xlsx.utils.json_to_sheet(inventory);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Inventory");

    // 👉 Excel buffer
    const buffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer"
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inventory.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Excel export failed",
      error: error.message
    });
  }
});
// Get ALL Inventory
router.get("/", async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
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