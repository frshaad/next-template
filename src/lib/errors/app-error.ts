import { ERROR_CODES } from './error-config';
import type { ErrorCode, HttpStatus, PublicErrorOptions } from './types';

export interface AppErrorOptions extends PublicErrorOptions {
  status?: HttpStatus;
  expose?: boolean;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: HttpStatus;
  readonly expose: boolean;

  constructor({
    message = 'Internal server error.',
    code = ERROR_CODES.INTERNAL_ERROR,
    status = 500,
    expose = false,
    cause,
  }: AppErrorOptions = {}) {
    super(message, { cause });

    this.name = new.target.name;

    this.code = code;
    this.status = status;
    this.expose = expose;
  }
}
