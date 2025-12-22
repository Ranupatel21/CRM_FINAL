import express from "express";
import { Car } from "../models/car.model.js";

const router = express.Router();

// Brand
router.get("/car/brands", async (req, res) => {
  const brands = await Car.distinct("brand");
  res.json(brands);
});

// Model
router.get("/car/models", async (req, res) => {
  const { brand } = req.query;
  const models = await Car.distinct("model", { brand });
  res.json(models);
});

// Variant (NESTED)
router.get("/car/variants", async (req, res) => {
  const { brand, model } = req.query;

  const car = await Car.findOne({ brand, model });
  const variants = car ? car.variants.map(v => v.name) : [];

  res.json(variants);
});

// Color (NESTED)
router.get("/car/colors", async (req, res) => {
  const { brand, model, variant } = req.query;

  const car = await Car.findOne({
    brand,
    model,
    "variants.name": variant
  });

  const selectedVariant = car?.variants.find(
    v => v.name === variant
  );

  res.json(selectedVariant?.colors || []);
});
export default router;
