import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';
import type { PublicErrorOptions } from './types';

export class UnauthorizedError extends AppError {
  constructor({
    message = 'Authentication required.',
    code = ERROR_CODES.AUTH_UNAUTHORIZED,
    cause,
  }: PublicErrorOptions = {}) {
    super({
      message,
      code,
      status: 401,
      expose: true,
      cause,
    });
  }
}
