import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/post-upvote-page';
import { getCurrentUserId } from '~/features/users/queries';
import { toggleUpvote } from '../mutations';

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }

  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const { postId } = params;

  await toggleUpvote(client, { postId: Number(postId), userId });

  return { ok: true };
};
