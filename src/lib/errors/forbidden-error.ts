import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';
import type { PublicErrorOptions } from './types';

export class ForbiddenError extends AppError {
  constructor({
    message = 'Access denied.',
    code = ERROR_CODES.AUTH_FORBIDDEN,
    cause,
  }: PublicErrorOptions = {}) {
    super({
      message,
      code,
      status: 403,
      expose: true,
      cause,
    });
  }
}
