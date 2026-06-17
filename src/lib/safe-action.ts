import { betterAuth } from '@next-safe-action/adapter-better-auth';
import { createSafeActionClient } from 'next-safe-action';
import z from 'zod';

import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string().min(1),
    });
  },
  handleServerError(error, { metadata }) {
    logger.error({ action: metadata.actionName, err: error }, 'Server action error');

    return 'An unexpected error occurred. Please try again.';
  },
}).use(async ({ next, metadata }) => {
  const start = performance.now();
  const result = await next();
  const duration = performance.now() - start;

  if (duration > 1000) {
    logger.warn(
      {
        action: metadata.actionName,
        durationMs: Math.round(duration),
        success: !result.validationErrors && !result.serverError,
      },
      `Action ${metadata.actionName} took ${Math.round(duration)}ms to finish.`
    );
  }

  return result;
});

export const authClient = actionClient.use(betterAuth(auth));
