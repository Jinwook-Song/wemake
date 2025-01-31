import { Hero } from '~/common/components/hero';
import type { Route } from './+types/ideas-page';
import { IdeaCard } from '../components/idea-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'IdeasGPT | wemake' },
    { name: 'description', content: 'Find ideas for your next project' },
  ];
};

export default function IdeasPage() {
  return (
    <div className='space-y-20'>
      <Hero title='IdeasGPT' description='Find ideas for your next project' />
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id='ideaId'
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a web dashboard to track progress and see insights.'
            viewCount={123}
            createdAt='12 hours ago'
            likesCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
