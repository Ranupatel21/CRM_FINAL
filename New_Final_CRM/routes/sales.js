// import { Router } from 'express';
// const router = Router();

// import { Lead, Vehicle, TestDrive, Quotation, Booking } from './models';

// // -------------------- LEADS --------------------

// // CREATE Lead
// router.post('/lead', async (req, res) => {
//   try {
//     const lead = await Lead.create(req.body);
//     res.json(lead);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // GET ALL Leads
// router.get('/leads', async (req, res) => {
//   try {
//     const leads = await Lead.find();
//     res.json(leads);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // -------------------- VEHICLES --------------------
// router.post('/vehicle', async (req, res) => {
//   try {
//     const vehicle = await Vehicle.create(req.body);
//     res.json(vehicle);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.get('/vehicles', async (req, res) => {
//   try {
//     const vehicles = await Vehicle.find();
//     res.json(vehicles);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // -------------------- TEST DRIVES --------------------
// router.post('/testdrive', async (req, res) => {
//   try {
//     const td = await TestDrive.create(req.body);
//     res.json(td);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.get('/testdrives', async (req, res) => {
//   try {
//     const td = await TestDrive.find();
//     res.json(td);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // -------------------- QUOTATIONS --------------------
// router.post('/quotation', async (req, res) => {
//   try {
//     const quotation = await Quotation.create(req.body);
//     res.json(quotation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.get('/quotations', async (req, res) => {
//   try {
//     const quotation = await Quotation.find();
//     res.json(quotation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // -------------------- BOOKINGS --------------------
// router.post('/booking', async (req, res) => {
//   try {
//     const booking = await Booking.create(req.body);
//     res.json(booking);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;
