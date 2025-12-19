import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    price: {type: Number, required: true},
    model: { type: String, required: true },
    variant: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock"
    }
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
