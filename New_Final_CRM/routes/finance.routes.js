import express from "express";
import { Invoice, Loan, Commission } from "../models/finance.model.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const {
      clientName,
      invoiceNumber,
      subTotal,
      gstRate = 18,
      dueDate
    } = req.body;

    const gstAmount = (subTotal * gstRate) / 100;
    const totalAmount = subTotal + gstAmount;

    const invoice = await Invoice.create({
      clientName,
      invoiceNumber,
      subTotal,
      gstRate,
      gstAmount,
      totalAmount,
      dueDate,
      status: "Pending"
    });

    res.status(201).json({ message: "Invoice created", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get All Invoices
router.get("/invoice", async (req, res) => {
  const invoices = await Invoice.find()//.sort({ createdAt: -1 });
  res.json(invoices);
});

//  Get Pending / Overdue Invoices
// router.get("/invoice/status/:status", async (req, res) => {
//   const invoices = await Invoice.find({ status: req.params.status });
//   res.json(invoices);
// });

// Get Paid invoices
router.get("/invoice/paid", async (req, res) => {
  const Invoices = await Invoice.find({ status: "Paid" });
  res.json(Invoices);
});
// Get overdue invoices
router.get("/invoice/overdue", async (req,res) => {
  const Invoices = await Invoice.find({ status : "Overdue"});
  res.json(Invoices);
});
// Get pending invoices
router.get("/invoice/pending", async (req, res) => {
  const invoices = await Invoice.find({ status : "Pending"});
  res.json(invoices);
});

// Update Invoice
router.put("/invoice/:id", async (req, res) => {
  try {
    const oldInvoice = await Invoice.findById(req.params.id);

    if (!oldInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
  const invoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (oldInvoice.status !== "Paid" && invoice.status === "Paid") {
      const stock = await Inventory.findOneAndUpdate(
        {
          brand: invoice.brand,
          model: invoice.model,
          variant: invoice.variant,
          color: invoice.color,
          quantity: { $gt: 0 }
        },
        { $inc: { quantity: -1 } },
        { new: true }
      );
        if (!stock) {
        return res.status(400).json({
          message: "Stock not available while finalizing invoice"
        });
      }
    }
  res.json(invoice);
    } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


//  Delete Invoice
router.delete("/invoice/:id", async (req, res) => {
  await Invoice.findByIdAndDelete(req.params.id);
  res.json({ message: "Invoice deleted" });
});



//  Create Loan
router.post("/loan", async (req, res) => {
  try {
    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Loans
router.get("/loan", async (req, res) => {
  const loans = await Loan.find();
  res.json(loans);
});

//  Get Active Loans
router.get("/loan/active", async (req, res) => {
  const loans = await Loan.find({ status: "Active" });
  res.json(loans);
});

// get closed loans 
router.get("/loan/closed", async (req, res) => {
    const loans = await Loan.find({ status : "Closed" });
    res.json(loans);
});

// Get defaulted loans
router.get("/loan/defaulted", async (req , res) => {
    const loans = await Loan.find({ status : "Defaulted" });
    res.json(loans);
});

//  Update Loan
router.put("/loan/:id", async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(loan);
});



// Create Commission
router.post("/commission", async (req, res) => {
  try {
    const commission = await Commission.create(req.body);
    res.status(201).json(commission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//  Get All Commissions
router.get("/commission", async (req, res) => {
  const commissions = await Commission
    .find()
    .populate("relatedInvoice", "invoiceNumber amount status");
  res.json(commissions);
});

//  Get Unpaid Commissions
router.get("/commission/unpaid", async (req, res) => {
  const commissions = await Commission.find({ status: "Unpaid" });
  res.json(commissions);
});

// Update Commission Status
router.put("/commission/:id", async (req, res) => {
  const commission = await Commission.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(commission);
});

export default router;

