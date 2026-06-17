'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { toast } from 'sonner';

import { createPost } from '@/actions/create-post';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPostSchema } from '@/lib/validations/post';

export function CreatePostForm() {
  const { form, resetFormAndAction, handleSubmitWithAction, action } = useHookFormAction(
    createPost,
    zodResolver(createPostSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          toast.success(`Post published: ${data.newPost.title}`);
          resetFormAndAction();
        },
      },
      formProps: {
        defaultValues: { body: '', title: '' },
      },
    }
  );

  const {
    register,
    formState: { errors },
  } = form;
  const { isPending } = action;

  const titleId = 'title';
  const titleErrorId = 'title-error';
  const bodyErrorId = 'body-error';

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a New Post</CardTitle>
        <CardDescription>Share your thoughts with the community</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmitWithAction}>
        <FieldSet disabled={isPending}>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor={titleId}>Title</FieldLabel>
              <FieldContent>
                <Input
                  id={titleId}
                  placeholder="Enter post title"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? titleErrorId : undefined}
                  {...register('title')}
                />
                {errors.title ? (
                  <p id={titleErrorId} role="alert" className="text-destructive text-sm">
                    {errors.title.message}
                  </p>
                ) : (
                  <FieldDescription>The main topic of your post</FieldDescription>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor="body">Content</FieldLabel>
              <FieldContent>
                <Textarea
                  id="body"
                  placeholder="Write your post content here..."
                  aria-invalid={Boolean(errors.body)}
                  aria-describedby={errors.body ? bodyErrorId : undefined}
                  {...register('body')}
                />
                {errors.body ? (
                  <p id={bodyErrorId} className="text-destructive text-sm">
                    {errors.body.message}
                  </p>
                ) : (
                  <FieldDescription>Share your thoughts and ideas</FieldDescription>
                )}
              </FieldContent>
            </Field>

            {action.result.serverError && (
              <p role="alert" className="text-destructive text-sm">
                {action.result.serverError}
              </p>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" aria-busy={isPending} className="w-full">
              {isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </CardFooter>
        </FieldSet>
      </form>
    </Card>
  );
}
