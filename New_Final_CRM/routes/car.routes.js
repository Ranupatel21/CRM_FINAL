import { Car } from "../models/car.model.js";

router.get("/brands", async (req, res) => {
  res.json(await VehicleMaster.distinct("brand"));
});

router.get("/models", async (req, res) => {
  const { brand } = req.query;
  res.json(await Car.distinct("model", { brand }));
});

router.get("/variants", async (req, res) => {
  const { brand, model } = req.query;
  res.json(await Car.distinct("variant", { brand, model }));
});

router.get("/colors", async (req, res) => {
  const { brand, model, variant } = req.query;
  res.json(
    await Car.distinct("color", { brand, model, variant })
  );
});
