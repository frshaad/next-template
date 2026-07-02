import { AppError } from './app-error';

export function handleError(error: unknown) {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: {
          code: error.code,
          message: error.expose ? error.message : 'Something went wrong',
        },
      },
      { status: error.status }
    );
  }

  // unknown errors
  return Response.json(
    {
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong',
      },
    },
    { status: 500 }
  );
}
