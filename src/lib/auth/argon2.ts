import { hash, verify } from '@node-rs/argon2';
import type { Options } from '@node-rs/argon2';

const options: Options = {
  memoryCost: 65_536,
  parallelism: 1,
  timeCost: 3,
};

/**
 * Hashes a plaintext password using Argon2id.
 *
 * This function should only be called on the server.
 *
 * @param password - User's plaintext password
 * @returns Argon2id hash including salt and parameters
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, options);
}

/**
 * Verifies a plaintext password against a stored Argon2id hash.
 *
 * The hash string already contains the parameters and salt, so no options
 * object is required here.
 *
 * @param hashValue - Stored Argon2id hash
 * @param password - Plaintext password to verify
 * @returns Whether the password matches the hash
 */
export async function verifyPassword(data: { hash: string; password: string }): Promise<boolean> {
  return await verify(data.hash, data.password);
}
