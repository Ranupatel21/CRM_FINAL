import mongoose from "mongoose"
// employees details
const employeeShema = new mongoose.Schema({
    employeId : {
        type : String ,
        unique : true ,
        required : true
    },
    employeName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    phone : {
        type : String
    },
    department : {
         type : String,
         enum : ["HR","Sales","Finance","Tech"],
         required : true
    },
    degination : {
        type : String
    },
    role : {
        type : String,
        enum : ["Admin","Manager","Employee"],
        default : Employee
    },
    joiningDate : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        enum : ["Active","Resigned"],
        default : Active

    } 
}, 
  { timestamps: true }
);
export const Employee = mongoose.model("Employee",employeeShema);