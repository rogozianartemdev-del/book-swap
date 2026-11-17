import { z } from 'zod';

const emailSchema = z.string().trim().toLowerCase().email().max(255);

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: emailSchema,
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;