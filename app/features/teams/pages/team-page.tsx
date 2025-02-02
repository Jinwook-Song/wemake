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

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Team Details | wemake' },
    { name: 'description', content: 'View team details and members' },
  ];
};

export default function TeamPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title="Join Jinwook's Team" />
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 grid grid-cols-4 gap-5'>
          {[
            {
              title: 'Product Name',
              value: 'Doggie Social',
            },
            {
              title: 'Stage',
              value: 'MVP',
            },
            {
              title: 'Team Size',
              value: 10,
            },
            {
              title: 'Available Equity',
              value: 50,
            },
          ].map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className='text-sm font-medium text-muted-foreground'>
                  {item.title}
                </CardTitle>
                <CardContent className='text-2xl font-bold p-0'>
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
                  {[
                    'React Developer',
                    'Product Manager',
                    'UI/UX Designer',
                    'Full Stack Developer',
                  ].map((item) => (
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
                <p>
                  Doggie Social is a social media platform for dogs. It allows
                  dogs to connect with each other and share their experiences.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className='col-span-2 border rounded-lg shadow-md p-6 space-y-4'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarFallback>J</AvatarFallback>
              <AvatarImage src='https://github.com/jinwook-song.png' />
            </Avatar>
            <div className='flex flex-col'>
              <h4 className='text-lg font-medium'>Jinwook</h4>
              <Badge variant={'secondary'}>Entrepreneur</Badge>
            </div>
          </div>
          <Form className='space-y-5'>
            <InputPair
              id='introduction'
              name='introduction'
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
