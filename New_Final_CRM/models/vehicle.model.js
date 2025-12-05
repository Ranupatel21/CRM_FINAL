import mongoose from "mongoose";

const { Schema, model } = mongoose;

const VehicleSchema = new Schema({
  vin: String,
  brand: String,
  model: String,
  variant: String,
  fuelType: String,
  color: String,
  price: Number,
  status: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

export const Vehicle = model("Vehicle", VehicleSchema);
