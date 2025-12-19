import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  name: String,
  colors: [String]
});

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    default: "Volkswagen"
  },
  model: {
    type: String,
    required: true
  },
  variants: [variantSchema]
});

export const Car = mongoose.model("Car", carSchema);
