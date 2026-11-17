import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().default(5432),
    DB_NAME: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRES_IN: z.string().default('1d'),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().default(587),
    SMTP_USER: z.string().email(),
    SMTP_PASS: z.string().min(1),
    SMTP_SECURE: z.enum(['true', 'false'])
        .default('false')
        .transform((value) => value === 'true'),
    MAIL_FROM: z.string().min(1),

    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.coerce.number().default(6379),
});

export const env = envSchema.parse(process.env);