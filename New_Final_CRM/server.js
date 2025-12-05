// require("dotenv").config();
// import express, { json } from "express";
// import { connect } from "mongoose";
// import cors from "cors";

// import leadRoutes from "./routes/lead.routes";
// import vehicleRoutes from "./routes/vehicle.routes";
// import bookingRoutes from "./routes/booking.routes";
// import quotationRoutes from "./routes/quotation.routes";
// import testDriveRoutes from "./routes/testdrive.routes";

// const app = express();
// app.use(cors());
// app.use(json());

// // DB CONNECT
// connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("DB Error:", err));

// app.get("/", (req, res) => res.send("CRM Backend Running..."));

// // API Routes


// app.use("/api/leads", leadRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/quotations", quotationRoutes);
// app.use("/api/testdrives", testDriveRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



 import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import leadRoutes from "./routes/lead.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import quotationRoutes from "./routes/quotation.routes.js";
import testDriveRoutes from "./routes/testdrive.routes.js";

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* -------------------- MONGODB CONNECTION -------------------- */
mongoose.connect(
  process.env.MONGO_URI || 
  "mongodb+srv://new_user21:new_user21@cluster0.c9nq7xd.mongodb.net/code_thapa?retryWrites=true&w=majority"
)
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("✅ CRM Backend Running...");
});

/* -------------------- API ROUTES -------------------- */
app.use("/api/leads", leadRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/testdrives", testDriveRoutes);

/* -------------------- SERVER START -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
