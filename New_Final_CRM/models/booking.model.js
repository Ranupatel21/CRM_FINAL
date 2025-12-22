import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  customerName: String,
  phone: String,
  vehicleId: String,
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  variants: {
    type: String,
    required: true
  },
  color: String,
  bookingPrice: Number,
  discount: Number,
  accessoriesCost: Number,
  finalPrice: Number,
  bookingAmountPaid: Number,
  status: {
  type: String,
  enum: ["Booked","Invoiced","Delivered","Cancelled"],
  default: "Booked"
},
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = model("Booking", BookingSchema);
