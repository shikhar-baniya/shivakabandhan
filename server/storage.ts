import { db } from "./db";
import {
  rsvps,
  type InsertRsvp,
  type Rsvp
} from "@shared/schema";

export interface IStorage {
  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
}

export class DatabaseStorage implements IStorage {
  async createRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const [rsvp] = await db.insert(rsvps).values(insertRsvp).returning();
    return rsvp;
  }
}

export const storage = new DatabaseStorage();
