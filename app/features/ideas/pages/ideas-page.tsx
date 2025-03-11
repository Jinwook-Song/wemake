import { Hero } from '~/common/components/hero';
import type { Route } from './+types/ideas-page';
import { IdeaCard } from '../components/idea-card';
import { getGptIdeas } from '../queries';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'IdeasGPT | wemake' },
    { name: 'description', content: 'Find ideas for your next project' },
  ];
};

export const loader = async () => {
  const ideas = await getGptIdeas({ limit: 20 });
  return { ideas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  const { ideas } = loaderData;
  return (
    <div className='space-y-20'>
      <Hero title='IdeasGPT' description='Find ideas for your next project' />
      <div className='grid grid-cols-4 gap-4'>
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewCount={idea.views}
            createdAt={idea.created_at}
            likesCount={idea.likes}
            claimed={idea.claimed}
          />
        ))}
      </div>
    </div>
  );
}
