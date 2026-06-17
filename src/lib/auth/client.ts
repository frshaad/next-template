import { lastLoginMethodClient } from 'better-auth/client/plugins';
import { nextCookies } from 'better-auth/next-js';
import { createAuthClient } from 'better-auth/react';

export const { signIn, signUp, signOut, useSession, getSession } = createAuthClient({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [lastLoginMethodClient(), nextCookies()],
});
