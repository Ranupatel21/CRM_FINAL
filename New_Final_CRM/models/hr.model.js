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
        type : string
    },
    department : {
         type : string,
         enum : ["HR","Sales","Finance","Tech"],
         required : true
    },
    degination : {
        type : string
    },
    role : {
        type : string,
        enum : ["Admin","Manager","Employee"],
        default : Employee
    },
    joiningDate : {
        type : Date,
        required : true
    },
    status : {
        type : string,
        enum : ["Active","Resigned"],
        default : Active

    } 
}, 
  { timestamps: true }
);
export const Employee = mongoose.model("Employee",employeeShema);