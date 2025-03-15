import { Hero } from '~/common/components/hero';
import type { Route } from './+types/teams-page';
import { TeamCard } from '../components/team-card';
import { getTeams } from '../queries';
import { makeSSRClient } from '~/supa-client';
export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Teams | wemake' },
    { name: 'description', content: 'Find a team looking for a new member' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const teams = await getTeams(client, { limit: 8 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  const { teams } = loaderData;
  return (
    <div className='space-y-20'>
      <Hero title='Teams' description='Find a team looking for a new member' />
      <div className='grid grid-cols-4 gap-4'>
        {teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            leaderUsername={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(',')}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
}
