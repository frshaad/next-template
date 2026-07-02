import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';
import type { PublicErrorOptions } from './types';

export class NotFoundError extends AppError {
  constructor({
    message = 'Resource not found.',
    code = ERROR_CODES.RESOURCE_NOT_FOUND,
    cause,
  }: PublicErrorOptions = {}) {
    super({
      message,
      code,
      status: 404,
      expose: true,
      cause,
    });
  }
}
