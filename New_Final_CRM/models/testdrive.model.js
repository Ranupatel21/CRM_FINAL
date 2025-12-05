import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TestDriveSchema = new Schema({
  customerName: String,
  vehicleId: String,
  date: { type: Date },
  timeSlot: String,
  status: String,
  assignedSalesPersonId: String,
  createdAt: { type: Date, default: Date.now },
});

export const TestDrive = model("TestDrive", TestDriveSchema);
