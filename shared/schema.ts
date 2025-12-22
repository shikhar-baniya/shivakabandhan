import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rsvps = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  attendance: text("attendance").notNull(), // "accepts" | "declines"
  guestCount: integer("guest_count").notNull(),
  dietaryPreferences: text("dietary_preferences"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRsvpSchema = createInsertSchema(rsvps).omit({ id: true, createdAt: true });

export type Rsvp = typeof rsvps.$inferSelect;
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
