import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-post-page';
import { Form, redirect, useNavigation } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '~/features/users/queries';
import { getTopics } from '../queries';
import { z } from 'zod';
import { createPost } from '../mutations';
import { Loader } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Post | wemake' },
    { name: 'description', content: 'Create a new community post' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getCurrentUserId(client);
  const topics = await getTopics(client);

  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1).max(40),
  category: z.string().min(1),
  content: z.string().min(1).max(1000),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) return { fieldErrors: error.flatten().fieldErrors };

  const { title, category, content } = data;
  const { post_id } = await createPost(client, {
    title,
    category,
    content,
    userId,
  });
  return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { topics } = loaderData;
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <div className='space-y-20'>
      <Hero
        title='Create Discussion'
        description='Ask questions, share ideas, and connect with the wemake community.'
      />
      <Form method='post' className='space-y-10 max-w-screen-md mx-auto'>
        <InputPair
          id='title'
          name='title'
          label='Title'
          description='(40 characters or less)'
          required
          placeholder='i.e What is the best productivity tool?'
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className='text-sm text-red-500'>
            {actionData.fieldErrors?.title?.join(', ')}
          </p>
        )}
        <SelectPair
          name='category'
          label='Category'
          description='Choose a category for your discussion'
          required
          placeholder='i.e Productivity'
          options={topics.map((topic) => ({
            label: topic.name,
            value: topic.slug,
          }))}
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className='text-sm text-red-500'>
            {actionData.fieldErrors?.category?.join(', ')}
          </p>
        )}
        <InputPair
          id='content'
          name='content'
          label='Content'
          description='(1000 characters or less)'
          required
          placeholder='i.e looking for a tool that can help me manage my time. What are the best tools out there?'
          textArea
        />
        {actionData && 'fieldErrors' in actionData && (
          <p className='text-sm text-red-500'>
            {actionData.fieldErrors?.content?.join(', ')}
          </p>
        )}
        <Button
          className='mx-auto min-w-40 flex justify-center'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader className='w-4 h-4 animate-spin' />
          ) : (
            'Create Discussion'
          )}
        </Button>
      </Form>
    </div>
  );
}
