import { Hero } from '~/common/components/hero';
import type { Route } from './+types/idea-page';
import { DotIcon, EyeIcon, HeartIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import { getGptIdea } from '../queries';
import { DateTime } from 'luxon';

export const meta: Route.MetaFunction = ({ data: { idea } }) => {
  return [
    { title: `Idea #${idea.gpt_idea_id} | wemake` },
    { name: 'description', content: idea.idea },
  ];
};

export const loader = async ({ params: { ideaId } }: Route.LoaderArgs) => {
  const idea = await getGptIdea({ ideaId });
  return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  const { idea } = loaderData;
  return (
    <div className='space-y-8'>
      <Hero title={`Idea #${idea.gpt_idea_id}`} />
      <div className='max-w-screen-sm mx-auto flex flex-col items-center gap-10'>
        <p className='italic text-center'>{idea.idea}</p>
        <div className='flex items-center text-sm'>
          <div className='flex items-center gap-2'>
            <EyeIcon className='size-4' />
            <span>{idea.views}</span>
          </div>
          <DotIcon className='size-4' />
          <span>{DateTime.fromISO(idea.created_at).toRelative()}</span>
          <DotIcon className='size-4' />
          <Button variant={'outline'}>
            <HeartIcon className='size-4' />
            <span>{idea.likes}</span>
          </Button>
        </div>
        <Button size={'lg'}>Claim idea now &rarr;</Button>
      </div>
    </div>
  );
}
