import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'Password must be at least 8 characters long.',
  })
  .regex(/[A-Z]/u, {
    message: 'Password must contain at least one uppercase letter.',
  })
  .regex(/[a-z]/u, {
    message: 'Password must contain at least one lowercase letter.',
  })
  .regex(/[0-9]/u, {
    message: 'Password must contain at least one number.',
  })
  .regex(/[^A-Za-z0-9]/u, {
    message: 'Password must contain at least one symbol.',
  });
