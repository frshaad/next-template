import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';
import type { InternalErrorOptions } from './types';

export class DatabaseError extends AppError {
  constructor({ message = 'Database operation failed.', cause }: InternalErrorOptions = {}) {
    super({
      message,
      code: ERROR_CODES.DATABASE_ERROR,
      status: 500,
      expose: false,
      cause,
    });
  }
}
