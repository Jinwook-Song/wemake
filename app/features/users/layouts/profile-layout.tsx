import { Form, Link, NavLink, Outlet } from 'react-router';
import type { Route } from './+types/profile-layout';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Button, buttonVariants } from '~/common/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/common/components/ui/dialog';
import { Textarea } from '~/common/components/ui/textarea';
import { Badge } from '~/common/components/ui/badge';
import { PencilIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import { getUserByUsername } from '../queries';
import client from '~/supa-client';

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
  const { user } = data;
  return [
    { title: `${user.name} | wemake` },
    { name: 'description', content: 'View user profile' },
  ];
};

export const loader = async ({
  params,
  request,
}: Route.LoaderArgs & { params: { username: string } }) => {
  const { username } = params;
  const user = await getUserByUsername(username);
  if (request.url.endsWith(`/users/${username}`)) {
    await client.rpc('track_event', {
      event_type: 'profile_view',
      event_data: { user_id: user.profile_id },
    });
  }
  return { user };
};

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div className='space-y-10'>
      <div className='flex items-center gap-5'>
        <Avatar className='size-40'>
          <AvatarFallback className='text-3xl'>{user.name[0]}</AvatarFallback>
          {user.avatar && <AvatarImage src={user.avatar} />}
        </Avatar>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-4xl font-bold'>{user.name}</h1>
            <Button size={'lg'} variant={'outline'} asChild>
              <Link to='/my/settings'>
                <PencilIcon className='size-4' />
                <span>Edit profile</span>
              </Link>
            </Button>
            <Button size={'lg'} variant={'secondary'}>
              Follow
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button size={'lg'} variant={'secondary'}>
                  Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <DialogDescription className='space-y-1'>
                  <span className='text-muted-foreground'>
                    Send a message to Jinwook to get in touch.
                  </span>
                  <Form className='space-y-5'>
                    <Textarea
                      placeholder='Message'
                      className='resize-none'
                      rows={4}
                      required
                    />
                    <Button type='submit' className='block ml-auto'>
                      Send
                    </Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-muted-foreground'>
              @{user.username}
            </span>
            <Badge variant={'secondary'}>{user.role}</Badge>
            <Badge variant={'secondary'}>100 followers</Badge>
            <Badge variant={'secondary'}>100 following</Badge>
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        {[
          { label: 'About', to: `/users/${user.username}` },
          { label: 'Products', to: `/users/${user.username}/products` },
          { label: 'Posts', to: `/users/${user.username}/posts` },
        ].map((item) => (
          <NavLink
            end
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: isActive ? 'secondary' : 'outline' }),
                'h-9',
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className='max-w-screen-md'>
        <Outlet
          context={{
            uid: user.profile_id,
            headline: user.headline,
            bio: user.bio,
          }}
        />
      </div>
    </div>
  );
}
