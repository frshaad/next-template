import { headers } from 'next/headers';
import { cache } from 'react';

import { auth } from '@/lib/auth';
import { ForbiddenError, UnauthorizedError } from '@/lib/errors';

/** Gets authentication session */
export const getSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    })
);

/** Requires authenticated user, throws AuthError if not logged in */
export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    throw new UnauthorizedError();
  }
  return session;
}

/** Requires authenticated user + ownership check */
export async function requireOwner(resourceOwnerId: string) {
  const session = await requireAuth();

  if (session.user.id !== resourceOwnerId) {
    throw new ForbiddenError();
  }

  return session;
}
