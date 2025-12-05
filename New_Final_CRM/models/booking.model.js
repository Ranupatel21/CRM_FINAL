import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  customerName: String,
  phone: String,
  vehicleId: String,
  basePrice: Number,
  discount: Number,
  accessoriesCost: Number,
  finalPrice: Number,
  bookingAmountPaid: Number,
  status: String,
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = model("Booking", BookingSchema);
