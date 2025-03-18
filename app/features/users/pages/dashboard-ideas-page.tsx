import { IdeaCard } from '~/features/ideas/components/idea-card';

import type { Route } from './+types/dashboard-ideas-page';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '../queries';
import { getClaimedIdeas } from '~/features/ideas/queries';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'My Ideas | wemake' },
    { name: 'description', content: 'Manage your ideas' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const ideas = await getClaimedIdeas(client, { userId });
  return { ideas };
};

export default function DashboardIdeasPage({
  loaderData,
}: Route.ComponentProps) {
  const { ideas } = loaderData;
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-semibold'>Claimed Ideas</h1>
      <div className='grid grid-cols-4 gap-4'>
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            owner={true}
          />
        ))}
      </div>
    </div>
  );
}
