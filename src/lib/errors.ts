import type { z } from 'zod';

/**
 * # Application Error Strategy
 *
 * This file defines a consistent error handling system for the entire
 * application.
 *
 * ### Guidelines:
 *
 * - **Always throw custom errors** instead of plain `new Error()`.
 * - Extend `AppError` for all custom errors.
 * - Use the most specific error class for the situation.
 * - Include meaningful `context` when possible — it helps with logging and
 *   debugging.
 *
 * ### Which error should I use?
 *
 * | Situation                          | Error Class                       | Status  | Example Use Case                     |
 * | ---------------------------------- | --------------------------------- | ------- | ------------------------------------ |
 * | Invalid user input / form data     | `ValidationError`                 | 400     | Zod validation failed                |
 * | Resource doesn't exist             | `NotFoundError`                   | 404     | Post, User, Product not found        |
 * | Authentication / Permission issues | `AuthError`                       | 401/403 | Login required, forbidden action     |
 * | Business / domain rule violation   | `BusinessError`                   | 422     | Cannot cancel shipped order          |
 * | Database failure                   | `DatabaseError`                   | 500     | Prisma/Drizzle query failed          |
 * | External API / service failure     | `ExternalServiceError`            | 502     | JSONPlaceholder, Stripe, etc. failed |
 * | Unexpected / unknown error         | `ExternalServiceError` or rethrow | 502/500 | Catch-all in data layer              |
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly context: Readonly<Record<string, unknown>>;

  constructor(
    message: string,
    statusCode = 500,
    code = 'INTERNAL_SERVER_ERROR',
    context: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.context = Object.freeze({ ...context });
  }

  /** Safe for Server Actions, Route Handlers, and API responses */
  toJSON() {
    return {
      code: this.code,
      context: this.context,
      message: this.message,
      name: this.name,
      statusCode: this.statusCode,
    } as const;
  }

  /** Returns a Next.js Response object */
  toResponse() {
    return Response.json(this.toJSON(), { status: this.statusCode });
  }
}

/* ==================== Core Errors ==================== */

/**
 * **ValidationError** - Use when input, form, or API data fails validation
 *
 * @example
 *   ```ts
 *   throw new ValidationError("Invalid user input");
 *   throw new ValidationError("Invalid data received", zodError.issues);
 */
export class ValidationError extends AppError {
  public readonly issues: readonly z.core.$ZodIssue[] | null;

  constructor(message = 'Validation failed', issues: readonly z.core.$ZodIssue[] | null = null) {
    super(message, 400, 'VALIDATION_ERROR', { issues });
    this.issues = issues;
    this.name = 'ValidationError';
  }
}

/**
 * **NotFoundError** - Use when a requested resource is missing
 *
 * @example
 *   ```ts
 *   throw new NotFoundError("Post", postId);
 *   throw new NotFoundError("User");
 */
export class NotFoundError extends AppError {
  constructor(resource = 'Resource', id?: string | number) {
    const message = String(id) ? `${resource} with id "${id}" not found` : `${resource} not found`;

    super(message, 404, 'NOT_FOUND', { id, resource });
    this.name = 'NotFoundError';
  }
}

/**
 * **AuthError** - Use for authentication and authorization failures
 *
 * @example
 *   ```ts
 *   throw AuthError.unauthorized();
 *   throw AuthError.forbidden("You can only edit your own posts");
 */
export class AuthError extends AppError {
  private constructor(message: string, statusCode: number, code: string) {
    super(message, statusCode, code);
    this.name = 'AuthError';
  }

  static unauthorized(message = 'Authentication required') {
    return new AuthError(message, 401, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Insufficient permissions') {
    return new AuthError(message, 403, 'FORBIDDEN');
  }
}

/**
 * **BusinessError** - Use when business/domain rules are violated
 *
 * @example
 *   ```ts
 *   throw new BusinessError("Cannot cancel an already shipped order", {
 *   orderId,
 *   status: "shipped",
 *   });
 */
export class BusinessError extends AppError {
  constructor(message: string, context: Record<string, unknown> = {}) {
    super(message, 422, 'BUSINESS_ERROR', context);
    this.name = 'BusinessError';
  }
}

/**
 * **DatabaseError** - Use for database-related failures
 *
 * @example
 *   ```ts
 *   throw new DatabaseError("Failed to create user", error);
 */
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', originalError?: unknown) {
    super(message, 500, 'DATABASE_ERROR', {
      original: originalError instanceof Error ? originalError.message : originalError,
    });
    this.name = 'DatabaseError';
  }
}

/**
 * **ExternalServiceError** - Use when calling external APIs or third-party
 * services fails
 *
 * @example
 *   ```ts
 *   // Basic
 *   throw new ExternalServiceError("Failed to fetch posts from external API");
 *
 *   // Recommended - with context
 *   throw new ExternalServiceError("Failed to fetch posts", {
 *   service: "jsonplaceholder",
 *   url: "https://jsonplaceholder.typicode.com/posts",
 *   status: response?.status,
 *   });
 */
export class ExternalServiceError extends AppError {
  constructor(message = 'External service request failed', context: Record<string, unknown> = {}) {
    super(message, 502, 'EXTERNAL_SERVICE_ERROR', context);
    this.name = 'ExternalServiceError';
  }
}
