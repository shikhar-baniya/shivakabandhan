import { z } from "zod";

// Simple schema for wedding invitation without database dependencies
export const insertRsvpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  attendance: z.enum(["accepts", "declines"]),
  guestCount: z.number().min(1).max(10),
  dietaryPreferences: z.string().optional(),
  message: z.string().optional(),
});

export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = InsertRsvp & {
  id: number;
  createdAt: Date;
};
