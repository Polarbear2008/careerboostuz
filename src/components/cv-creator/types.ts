
import { z } from "zod";

// Form schema
export const cvFormSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    jobTitle: z.string().min(2, "Job title is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(6, "Phone number is required"),
    location: z.string().optional(),
    website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    summary: z.string().min(20, "Summary should be at least 20 characters"),
    imageUrl: z.string().url().optional().or(z.literal("")),
  }),
  experience: z.array(
    z.object({
      title: z.string().min(2, "Job title is required"),
      company: z.string().min(2, "Company name is required"),
      location: z.string().optional(),
      startDate: z.string().min(4, "Start date is required"),
      endDate: z.string().optional(),
      current: z.boolean().optional(),
      description: z.string().min(10, "Description is required"),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string().min(2, "Degree is required"),
      institution: z.string().min(2, "Institution is required"),
      location: z.string().optional(),
      startDate: z.string().min(4, "Start date is required"),
      endDate: z.string().optional(),
      description: z.string().optional(),
    })
  ),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
});

export type CVFormValues = z.infer<typeof cvFormSchema>;
