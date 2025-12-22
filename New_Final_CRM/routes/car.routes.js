import express from "express";
import { Car } from "../models/car.model.js";

const router = express.Router();

// BRAND
router.get("/brands", async (req, res) => {
  const brands = await Car.distinct("brand");
  res.json(brands);
});

// MODEL
router.get("/models", async (req, res) => {
  const { brand } = req.query;
  const models = await Car.distinct("model", { brand });
  res.json(models);
});

// VARIANT (NESTED)
router.get("/variants", async (req, res) => {
  const { brand, model } = req.query;

  const car = await Car.findOne({ brand, model });
  const variants = car ? car.variants.map(v => v.name) : [];

  res.json(variants);
});

// COLOR (NESTED)
router.get("/colors", async (req, res) => {
  const { brand, model, variant } = req.query;

  const car = await Car.findOne({
    brand,
    model,
    "variants.name": variant
  });

  const selectedVariant = car?.variants.find(v => v.name === variant);
  res.json(selectedVariant?.colors || []);
});

export default router;
