import type { ERROR_CODES } from './error-config';

export type BuiltInErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ErrorCode = BuiltInErrorCode | (string & {});

export type HttpStatus = 400 | 401 | 403 | 404 | 409 | 422 | 500 | 502 | 503;

export interface PublicErrorOptions {
  message?: string;
  code?: ErrorCode;
  cause?: unknown;
}

export interface InternalErrorOptions {
  message?: string;
  cause?: unknown;
}
