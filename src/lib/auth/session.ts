import { headers } from 'next/headers';
import { cache } from 'react';

import { auth } from '@/lib/auth';
import { AuthError } from '@/lib/errors';

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
    throw AuthError.unauthorized();
  }
  return session;
}

/** Requires authenticated user + ownership check (common pattern) */
export async function requireOwner(resourceOwnerId: string) {
  const session = await requireAuth();

  if (session.user.id !== resourceOwnerId) {
    throw AuthError.forbidden("You don't have permission to access this resource");
  }

  return session;
}
