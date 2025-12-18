import express from "express";
import {Employee} from "../models/hr.model.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import { mockAuth } from "../middlewares/mockAuth.middleware.js";
const router = express.Router();
// create employee registeration from
/*router.post("/employee",async (req , res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    }
    catch (err){ 
        res.status(400).json({error: err.messege});
    }
} );*/

// Get all employee
// router.get("/employee", async (req, res) => {
//     const employee = await Employee.find()
//     res.json(employee);
// });

// // update employee
 router.put("/employee/:id",
 mockAuth,
 allowRoles("Admin","Manager"),
  async (req , res) => {
     const employee = await Employee.findByIdAndUpdate(
         req.params.id,
         req.body,
         {new : true}
     );
     res.json(employee);
 });

// // delete employee
 router.delete("/employee/:id",
 mockAuth,
 allowRoles("Admin","manager"),
 async (req, res) =>{
     await Employee.findByIdAndUpdate(req.params.id);
     res.json({messege : "employee deleted"});
 });
// // Hr department employee
router.get("/employee/hr", async (req, res) =>{
     const employee = await Employee({ status : "HR" });
    res.json(employee);
});
// //  sales department employee
router.get("/employee/sales", async (req , res) => {
 const employee = await Employee ({ status : "Sales" });
     res.json(employee);
 });
// // finance department employee
router.get("/employee/finance", async (req, res) => {
     const employee = await Employee ({ status : "Finance"});
    res.json(employee);
   });
// // tech department
router.get("/employee/tech", async (req, res) => {
     const employee = await Employee ({ status : "Tech"});
    res.json(employee);
});

// admin role 
// Admin only
/*router.post(
  "/employee",
  mockAuth,
  allowRoles("Admin"),
  async (req, res) => {
    const emp = await Employee.create(req.body);
    res.json(emp);
  }
);*/

// Admin + Manager
router.get(
  "/employee",
  mockAuth,
  allowRoles("Admin", "Manager"),
  async (req, res) => {
    const data = await Employee.find();
    res.json(data);
  }
);

router.post(
  "/employee",
  mockAuth,
  allowRoles("Admin"),
  async (req, res) => {
    try {
      console.log("POST HIT");
      console.log("USER:", req.user);
      console.log("BODY:", req.body);

      const emp = await Employee.create(req.body);
      return res.status(201).json(emp);

    } catch (error) {
      console.error("EMPLOYEE CREATE ERROR:", error);
      return res.status(400).json({
        message: "Employee create failed",
        error: error.message
      });
    }
  }
);

// router.post(
//   "/employee",
//   mockAuth,
//   allowRoles("Admin"),
//   async (req, res) => {
//     console.log("POST HIT");
//     console.log("USER:", req.user);
//     console.log("BODY:", req.body);

//     const emp = await Employee.create(req.body);
//     res.json(emp);
//   }
// );

export default router;