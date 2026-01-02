import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Simple API endpoint for testing
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Wedding invitation server running" });
  });

  return httpServer;
}
