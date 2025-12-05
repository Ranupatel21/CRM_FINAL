// /* -----------------------------
  // LEAD TYPES/
export interface Lead {
  id: string;
  customerName: string;
  company?: string;
  value?: number;
  status: 'New' | 'Contacted' | 'Proposal' | 'Won' | 'Lost';
  assignedToId?: string;
  lastActivity?: string;
  nextFollowUp?: string;
  createdAt?: string;
}

/* -----------------------------
   VEHICLE TYPES
------------------------------*/
export interface Vehicle {
  id: string;
  vin?: string;
  brand?: string;
  model: string;
  variant?: string;
  fuelType?: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | 'CNG';
  color?: string;
  price?: number;
  status?: 'Available' | 'Booked' | 'Sold';
  image?: string;
  createdAt?: string;
}

/* -----------------------------
   TEST DRIVE TYPES
------------------------------*/
export interface TestDrive {
  id: string;
  customerName: string;
  vehicleId: string;
  date: string;
  timeSlot: string;
  status?: 'Scheduled' | 'Completed' | 'Cancelled';
  assignedSalesPersonId?: string;
  createdAt?: string;
}

/* -----------------------------
   QUOTATION TYPES
------------------------------*/
export interface Quotation {
  id: string;
  customerName?: string;
  vehicleId?: string;
  exShowroomPrice?: number;
  insurance?: number;
  registrationCharges?: number;
  accessories?: number;
  totalOnRoadPrice?: number;
  date?: string;
  createdAt?: string;
}

/* -----------------------------
   BOOKING TYPES
------------------------------*/
export interface Booking {
  id: string;
  customerName?: string;
  phone?: string;
  vehicleId: string;
  basePrice?: number;
  discount?: number;
  accessoriesCost?: number;
  finalPrice?: number;
  bookingAmountPaid?: number;
  date?: string;
  status?: 'Booked' | 'Delivered' | 'Cancelled';
  createdAt?: string;
}

/* -----------------------------
   FINANCE TYPES
------------------------------*/
export interface Invoice {
  id: string;
  bookingId?: string;
  amount?: number;
  date?: string;
  dueDate?: string;
  status?: 'Pending' | 'Paid' | 'Cancelled';
}

/* -----------------------------
   LOAN TYPES
------------------------------*/
export interface LoanApplication {
  id: string;
  customerName?: string;
  vehicleId?: string;
  bankName?: string;
  loanAmount?: number;
  status?: 'Applied' | 'Processing' | 'Approved' | 'Rejected' | 'Disbursed';
  applicationDate?: string;
}

/* -----------------------------
   EMPLOYEE TYPES
------------------------------*/
export interface EmployeeReview {
  id: string;
  date: string;
  rating: number;
  notes?: string;
  reviewerId: string;
}

export interface Employee {
  id: string;
  name: string;
  position?: string;
  department?: string;
  salary?: number;
  joinDate?: string;
  performanceRating?: number;
  reviews?: EmployeeReview[];
}

/* -----------------------------
   SERVICE JOB TYPES
------------------------------*/
export interface ServiceJob {
  id: string;
  customerName?: string;
  vehicleModel?: string;
  registrationNumber?: string;
  serviceType?: string;
  status?: 'Pending' | 'In Progress' | 'Washing' | 'Ready' | 'Delivered';
  dateIn?: string;
}

/* -----------------------------
   USER TYPES
------------------------------*/
export interface User {
  id: string;
  username: string;
  name?: string;
  role?: 'Admin' | 'Sales' | 'Finance' | 'HR' | 'Service';
}
