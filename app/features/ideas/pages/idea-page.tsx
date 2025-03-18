import { Hero } from '~/common/components/hero';
import type { Route } from './+types/idea-page';
import { DotIcon, EyeIcon, HeartIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import { getGptIdea, getGptIdeaViews } from '../queries';
import { DateTime } from 'luxon';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '~/features/users/queries';
import { Form, redirect } from 'react-router';
import { claimIdea } from '../mutations';

export const meta: Route.MetaFunction = ({ data: { idea } }) => {
  return [
    { title: `Idea #${idea.gpt_idea_id} | wemake` },
    { name: 'description', content: idea.idea },
  ];
};

export const loader = async ({
  params: { ideaId },
  request,
}: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);

  const [idea, { count }] = await Promise.all([
    getGptIdea(client, { ideaId }),
    getGptIdeaViews(client, { ideaId }),
  ]);

  if (idea.claimed) return redirect('/ideas');

  await client.rpc('track_event', {
    event_type: 'idea_view',
    event_data: { idea_id: ideaId },
  });
  return { idea, views: count ?? 0 };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const idea = await getGptIdea(client, { ideaId: params.ideaId });

  if (idea.claimed) return { ok: false };

  await claimIdea(client, { ideaId: params.ideaId, userId });

  return redirect('/my/dashboard/ideas');
};
export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  const { idea, views } = loaderData;

  return (
    <div className='space-y-8'>
      <Hero title={`Idea #${idea.gpt_idea_id}`} />
      <div className='max-w-screen-sm mx-auto flex flex-col items-center gap-10'>
        <p className='italic text-center'>{idea.idea}</p>
        <div className='flex items-center text-sm'>
          <div className='flex items-center gap-2'>
            <EyeIcon className='size-4' />
            <span>{views}</span>
          </div>
          <DotIcon className='size-4' />
          <span>{DateTime.fromISO(idea.created_at).toRelative()}</span>
          <DotIcon className='size-4' />
          <Button variant={'outline'}>
            <HeartIcon className='size-4' />
            <span>{idea.likes}</span>
          </Button>
        </div>
        {!idea.claimed && (
          <Form method='post'>
            <Button size={'lg'}>Claim idea now &rarr;</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
