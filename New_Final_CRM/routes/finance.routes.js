import express from "express";
import { Invoice, Loan, Commission } from "../models/finance.model.js";

const router = express.Router();

// Create Invoice
router.post("/invoice", async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
router.get("./invoice/pending", async (req, res) => {
  const invoices = await Invoice.find({ status : "Pending"});
  res.json(invoices);
});

// Update Invoice
router.put("/invoice/:id", async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(invoice);
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

