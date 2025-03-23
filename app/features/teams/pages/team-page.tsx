import { Hero } from '~/common/components/hero';
import type { Route } from './+types/team-page';
import { Button } from '~/common/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Badge } from '~/common/components/ui/badge';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { getTeamById } from '../queries';
import { makeSSRClient } from '~/supa-client';
export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Team Details | wemake' },
    { name: 'description', content: 'View team details and members' },
  ];
};

export const loader = async ({
  params: { teamId },
  request,
}: Route.LoaderArgs & { params: { teamId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const team = await getTeamById(client, { teamId });
  return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  const { team } = loaderData;
  return (
    <div className='space-y-20'>
      <Hero title={`Join ${team.team_leader.name}'s Team`} />
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 grid grid-cols-4 gap-5'>
          {[
            {
              title: 'Product Name',
              value: team.product_description,
            },
            {
              title: 'Stage',
              value: team.product_stage,
            },
            {
              title: 'Team Size',
              value: team.team_size,
            },
            {
              title: 'Available Equity',
              value: team.equity_split,
            },
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {item.title}
                </CardTitle>
                <CardContent className='text-2xl font-bold p-0 capitalize'>
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Looking for
              </CardTitle>
              <CardContent className='text-2xl font-bold p-0'>
                <ul className='text-lg list-disc list-inside'>
                  {team.roles.split(',').map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle className='text-sm font-medium text-muted-foreground'>
                Idea Description
              </CardTitle>
              <CardContent className='text-xl font-medium p-0'>
                <p>{team.product_description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className='col-span-2 border rounded-lg shadow-md p-6 space-y-4'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarFallback>{team.team_leader.name[0]}</AvatarFallback>
              {team.team_leader.avatar && (
                <AvatarImage src={team.team_leader.avatar} />
              )}
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-medium'>{team.team_leader.name}</h4>
              <Badge variant={'secondary'}>{team.team_leader.role}</Badge>
            </div>
          </div>
          <Form
            method='post'
            action={`/users/${team.team_leader.username}/messages`}
            className='space-y-5'
          >
            <InputPair
              id='content'
              name='content'
              label='Introduction yourself'
              description='Tell us about yourself'
              placeholder='i.e I am a product manager'
              type='text'
              required
              textArea
              rows={4}
            />
            <Button type='submit' className='w-full'>
              Get in touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
