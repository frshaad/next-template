import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';
import type { PublicErrorOptions } from './types';

export class ConflictError extends AppError {
  constructor({
    message = 'The request conflicts with the current resource state.',
    code = ERROR_CODES.CONFLICT,
    cause,
  }: PublicErrorOptions = {}) {
    super({
      message,
      code,
      status: 409,
      expose: true,
      cause,
    });
  }
}
