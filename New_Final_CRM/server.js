



 import express from "express";
 import cors from "cors";
 import mongoose from "mongoose";
 import dotenv from "dotenv";
 dotenv.config();

 import leadRoutes from "./routes/lead.routes.js";
 import vehicleRoutes from "./routes/vehicle.routes.js";
 import bookingRoutes from "./routes/booking.routes.js";
 import carRoutes from "./routes/car.routes.js";
 import quotationRoutes from "./routes/quotation.routes.js";
 import testDriveRoutes from "./routes/testdrive.routes.js";
 import inventoryRoutes from "./routes/inventory.routes.js";
 import finanaceRoutes from "./routes/finance.routes.js";
 import hrRoutes from "./routes/hr.routes.js";


 const app = express();
 //app.use(cors());
 app.use(express.json());
 app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


 // MongoDB connects
 mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB Connected"))
   .catch((err) => console.log(err));
    app.get("/", (req, res) => res.send("CRM Backend Running..."));


 // Routes
 app.use("/api/leads", leadRoutes);
 app.use("/api/vehicles", vehicleRoutes);
 app.use("/api/bookings", bookingRoutes);
 app.use("/api/cars", carRoutes);
 app.use("/api/quotations", quotationRoutes);
 app.use("/api/testdrives", testDriveRoutes);
 app.use("/api/inventory", inventoryRoutes);
 app.use("/api/finance", finanaceRoutes);
 app.use("/api/hr", hrRoutes);
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});