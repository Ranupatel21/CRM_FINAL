import mongoose from "mongoose";

/* ----------------------------------
   1. INVOICE SCHEMA
---------------------------------- */
const invoiceSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true
    },

    amount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue"],
      default: "Pending"
    },

    dueDate: {
      type: Date,
      required: true
    },

    paidDate: {
      type: Date
    }
  },
  { timestamps: true }
);

 
   //2. LOAN SCHEMA

const loanSchema = new mongoose.Schema(
  {
    lenderName: {
      type: String,
      required: true
    },

    loanAmount: {
      type: Number,
      required: true
    },

    interestRate: {
      type: Number, // percentage
      required: true
    },

    tenureMonths: {
      type: Number,
      required: true
    },

    emiAmount: {
      type: Number
    },

    status: {
      type: String,
      enum: ["Active", "Closed", "Defaulted"],
      default: "Active"
    },

    startDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

  // 3. COMMISSION SCHEMA

const commissionSchema = new mongoose.Schema(
  {
    agentName: {
      type: String,
      required: true
    },

    relatedInvoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice"
    },

    commissionType: {
      type: String,
      enum: ["Flat", "Percentage"],
      required: true
    },

    commissionValue: {
      type: Number,
      required: true
    },

    commissionAmount: {
      type: Number,
      required: true
    },
    relatedInvoice: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Invoice" // EXACT model name
    },


    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid"
    }
  },
  { timestamps: true }
);


export const Invoice = mongoose.model("Invoice", invoiceSchema);
export const Loan = mongoose.model("Loan", loanSchema);
export const Commission = mongoose.model("Commission", commissionSchema);


