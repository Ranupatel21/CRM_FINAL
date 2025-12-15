import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LeadSchema = new Schema({
  customerName: { type: String, required: true },
  company: String,
  value: Number,
  status: {
    type: String,
    enum: ["New", "Contacted", "Proposal", "Won", "Lost"],
    default: "New",
  },
  phone : {
     type: String,
     required: true,
     trim: true,
  },
   color: {
      type: String, // eg: Red, White, Black
      trim: true,
  },
     model: {
      type: String, // eg: Swift, Baleno, Creta
      trim: true,
  },

  assignedToId: String,
  lastActivity: String,
  nextFollowUp: String,
  createdAt: { type: Date, default: Date.now },
});

// Export model
export const Lead = model("Lead", LeadSchema);
