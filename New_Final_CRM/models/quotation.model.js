import mongoose from "mongoose";

const { Schema, model } = mongoose;

const QuotationSchema = new Schema({
  customerName: String,
  vehicleId: String,
  exShowroomPrice: Number,
  insurance: Number,
  registrationCharges: Number,
  accessories: Number,
  totalOnRoadPrice: Number,
  date: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const Quotation = model("Quotation", QuotationSchema);



