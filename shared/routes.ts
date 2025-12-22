import { z } from 'zod';
import { insertRsvpSchema, rsvps } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  rsvps: {
    create: {
      method: 'POST' as const,
      path: '/api/rsvps',
      input: insertRsvpSchema,
      responses: {
        201: z.custom<typeof rsvps.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type RsvpInput = z.infer<typeof api.rsvps.create.input>;
export type RsvpResponse = z.infer<typeof api.rsvps.create.responses[201]>;
