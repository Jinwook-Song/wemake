import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/see-notification-page';
import { getCurrentUserId } from '../queries';
import { seeNotification } from '../mutations';

export const action = async ({ request, params }: Route.ActionArgs) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }

  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const { notificationId } = params;

  await seeNotification(client, {
    userId,
    notificationId: Number(notificationId),
  });
  return { ok: true };
};
