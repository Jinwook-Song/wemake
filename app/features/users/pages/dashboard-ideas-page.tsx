import { IdeaCard } from '~/features/ideas/components/idea-card';
import type { Route } from './+types/dashboard-ideas-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'My Ideas | wemake' },
    { name: 'description', content: 'Manage your ideas' },
  ];
};

export default function DashboardIdeasPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-semibold'>Claimed Ideas</h1>
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id={index}
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a web dashboard to track progress and see insights.'
            viewCount={123}
            createdAt='12 hours ago'
            likesCount={12}
            claimed={false}
          />
        ))}
      </div>
    </div>
  );
}
