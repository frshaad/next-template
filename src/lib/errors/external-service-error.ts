import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';
import type { PublicErrorOptions } from './types';

export class ExternalServiceError extends AppError {
  constructor({
    message = 'External service unavailable.',
    code = ERROR_CODES.EXTERNAL_SERVICE_ERROR,
    cause,
  }: PublicErrorOptions = {}) {
    super({
      message,
      code,
      status: 503,
      expose: false,
      cause,
    });
  }
}
