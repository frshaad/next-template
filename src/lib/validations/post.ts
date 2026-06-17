import z from 'zod';

import type { Post } from '@/types/post';

export const postSchema = z.object({
  body: z.string().min(1, "Body shouldn't be empty"),
  createdAt: z.date().default(new Date()),
  id: z.number().int().positive(),
  title: z.string().min(1, "Title shouldn't be empty"),
  userId: z.number().int().positive(),
}) satisfies z.ZodType<Post>;

export const createPostSchema = postSchema.pick({ body: true, title: true });
