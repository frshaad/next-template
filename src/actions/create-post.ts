'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/lib/prisma';
import { authClient } from '@/lib/safe-action';
import { createPostSchema } from '@/lib/validations/post';

export const createPost = authClient
  .metadata({ actionName: 'createPost' })
  .inputSchema(createPostSchema)
  .action(async ({ ctx, parsedInput }) => {
    const newPost = await prisma.post.create({
      data: {
        body: parsedInput.body,
        title: parsedInput.title,
        userId: ctx.auth.user.id,
      },
    });

    revalidatePath('/posts');

    return { newPost };
  });
