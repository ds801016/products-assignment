import * as z from "zod";

export const SelectSchema = z.object({
  text: z.string(),
  value: z.string(),
});

export const stage1Schema = z.object({
  userName: z.string().min(3, "Enter a valid username"),
  password: z.string().min(3, "Enter a valid password"),
  confirmPassword: z.string().min(3, "Enter a valid password"),
  businessName: z.string().min(3, "Enter a valid buisiness name"),
  website: z.string().optional(),
  email: z.string().min(3, "Enter a valid email"),
  firstName: z.string().min(3, "Enter a first name"),
  lastName: z.string().min(3, "Enter a Last name"),
  officeAddress: z.string().min(3, "Enter a valid office address"),
  zipCode: z.string().min(3, "Enter a valid zip code"),
  country: z.union([SelectSchema, z.string().min(3, "Select a country")]),
  phone: z.string().min(3, "Enter a valid phone number"),
  pan: z.string().min(3, "Enter a valid PAN"),
  establishmentYear: z.string().length(4, "Enter a valid year"),
  empCount: z.string().min(1, "Enter a valid count"),
  brandName: z.string().min(4, "Enter a valid name"),
  isExporting: z.boolean().optional(),
  salesVolume: z.string().min(1, "Sales volume is required"),
  industryType: z.string().min(1, "Industry type is required"),
  flagShipProducts: z.string().optional(),
  interestZones: z.array(z.string()),
  interestCategories: z.array(z.string()),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub Category is required"),
});

export const stage2Schema = z.object({
  name: z.string().min(3, "Enter a name"),
  designation: z.string().min(3, "Desgnation is required"),
  phone: z.string().min(3, "Phone No. is required"),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(3, "City is required"),
  zipCode: z.string().min(3, "Zip Code is required"),
  country: z.union([SelectSchema, z.string().min(3, "Select a country")]),
  dob: z.string().min(3, "DOB is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital Status is required"),
  nationality: z.string().min(1, "Nationality is required"),
  alternative: z.string().optional(),
});
export type Stage1Type = z.infer<typeof stage1Schema>;
export type Stage2Type = z.infer<typeof stage2Schema>;
