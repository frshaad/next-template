import 'server-only';
import pino from 'pino';

import { env } from '@/env';

/**
 * Central application logger.
 *
 * In development: - pretty colored logs
 *
 * In production: - structured JSON logs
 */
export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',

  transport:
    env.NODE_ENV === 'production'
      ? undefined
      : {
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
          target: 'pino-pretty',
        },
});
