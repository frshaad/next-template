import { z } from 'zod';
import type { ZodError } from 'zod';

import { AppError } from './app-error';
import { ERROR_CODES } from './error-config';

export class ValidationError extends AppError {
  readonly zodError: ZodError;
  readonly flattened: z.core.$ZodFlattenedError<unknown>;

  constructor(error: ZodError) {
    super({
      message: 'Validation failed.',
      code: ERROR_CODES.VALIDATION_FAILED,
      status: 422,
      expose: true,
      cause: error,
    });

    this.zodError = error;
    this.flattened = z.flattenError(error);
  }
}
