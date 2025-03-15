import { redirect } from 'react-router';
import type { Route } from './+types/my-profile-page';
import { makeSSRClient } from '~/supa-client';
import { getUserById } from '../queries';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return redirect('/auth/login');

  const profile = await getUserById(client, { profileId: user.id });
  return redirect(`/users/${profile.username}`);
};
