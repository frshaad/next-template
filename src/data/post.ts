import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';

import { AppError, ExternalServiceError, ValidationError } from '@/lib/errors';
import { postSchema } from '@/lib/validations/post';
import type { Post } from '@/types/post';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function getPosts(): Promise<Post[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');

  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new ExternalServiceError('Failed to fetch posts from external API', {
        service: 'jsonplaceholder',
        status: response.status,
        statusText: response.statusText,
      });
    }

    const rawData: unknown = await response.json();
    const validated = z.array(postSchema).parse(rawData);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error in external posts:', error.issues);
      throw new ValidationError('Invalid data received from external API', error.issues);
    }

    if (error instanceof AppError) {
      throw error;
    }

    // Unexpected error
    console.error('Unexpected error fetching external posts:', error);

    throw new ExternalServiceError('Failed to fetch external posts', {
      originalError: error instanceof Error ? error.message : String(error),
      service: 'jsonplaceholder',
    });
  }
}

export async function getPost(postId: number): Promise<Post> {
  'use cache';
  cacheLife('hours');
  cacheTag(`post: ${postId}`);

  try {
    const response = await fetch(`${BASE_URL}/${postId}`);

    if (!response.ok) {
      throw new ExternalServiceError('Failed to fetch the post from external API', {
        service: 'jsonplaceholder',
        status: response.status,
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
      });
    }

    const rawData: unknown = await response.json();
    const validated = postSchema.parse(rawData);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error in external posts:', error.issues);
      throw new ValidationError('Invalid data received from external API', error.issues);
    }

    if (error instanceof AppError) {
      throw error;
    }

    // Unexpected error
    console.error('Unexpected error fetching external posts:', error);

    throw new ExternalServiceError('Failed to fetch external posts', {
      originalError: error instanceof Error ? error.message : String(error),
      service: 'jsonplaceholder',
    });
  }
}

export async function createPost(data: Pick<Post, 'title' | 'body' | 'userId'>): Promise<Post> {
  try {
    const response = await fetch(BASE_URL, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
    });

    if (!response.ok) {
      throw new ExternalServiceError('Failed to create post on external API', {
        service: 'jsonplaceholder',
        status: response.status,
      });
    }

    const rawData: unknown = await response.json();
    const validated = postSchema.parse(rawData);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error in external post:', error.issues);
      throw new ValidationError('Invalid data received from external API', error.issues);
    }

    if (error instanceof AppError) {
      throw error;
    }

    // Unexpected error
    console.error('Unexpected error creating the post:', error);

    throw new ExternalServiceError('Failed to create the post', {
      originalError: error instanceof Error ? error.message : String(error),
      service: 'jsonplaceholder',
    });
  }
}
