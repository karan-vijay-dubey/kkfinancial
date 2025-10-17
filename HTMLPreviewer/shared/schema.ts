import { z } from "zod";

// Loan Types
export const loanTypes = [
  "housing",
  "lap", // Loan Against Property
  "personal",
  "business",
  "vehicle",
  "education",
  "other"
] as const;

export type LoanType = typeof loanTypes[number];

// Consultation Request Schema
export const consultationRequestSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  city: z.string().default("Mumbai"),
  loanType: z.enum(loanTypes),
  loanAmount: z.string().optional(),
  income: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().default(true),
});

export type ConsultationRequest = z.infer<typeof consultationRequestSchema>;

// EMI Calculator Input Schema
export const emiCalculatorSchema = z.object({
  loanAmount: z.number().min(50000).max(50000000),
  interestRate: z.number().min(6).max(25),
  tenureYears: z.number().min(1).max(30),
});

export type EMICalculatorInput = z.infer<typeof emiCalculatorSchema>;

// EMI Calculator Result
export interface EMICalculatorResult {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
  principalPercent: number;
  interestPercent: number;
}

// Service Information
export interface ServiceInfo {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: string[];
  interestRate: string;
  maxAmount: string;
  maxTenure: string;
}

// Team Member
export interface TeamMember {
  name: string;
  title: string;
  description: string;
  expertise: string[];
  imageUrl?: string;
}

// FAQ Item
export interface FAQItem {
  question: string;
  answer: string;
}

// Contact Information
export const contactInfo = {
  phone: "+919372267693",
  emails: ["kkfinancial2016@gmail.com", "kkfinancial2016@yahoo.com"],
  address: "Office No 27, Ground Floor, Dimple Arcade, Thakur Complex, Kandivali East, Mumbai 400101",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM",
} as const;
