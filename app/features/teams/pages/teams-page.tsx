import { Hero } from '~/common/components/hero';
import type { Route } from './+types/teams-page';
import { TeamCard } from '../components/team-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Teams | wemake' },
    { name: 'description', content: 'Find a team looking for a new member' },
  ];
};

export default function TeamsPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title='Teams' description='Find a team looking for a new member' />
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 5 }).map((_, index) => (
          <TeamCard
            key={index}
            id='teamId'
            leaderUsername='jinwook'
            leaderAvatarUrl='https://github.com/jinwook-song.png'
            positions={[
              'React Developer',
              'Backend Developer',
              'Product Manager',
            ]}
            projectDescription='a new social media platform'
          />
        ))}
      </div>
    </div>
  );
}
