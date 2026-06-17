import type { NextRequest } from 'next/server';

type Handler = (request: NextRequest, context?: unknown) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    console.log('Check Auth');
    return await handler(req, context);
  };
}
