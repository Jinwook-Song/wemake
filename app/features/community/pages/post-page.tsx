import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb';
import type { Route } from './+types/post-page';
import { Form, Link } from 'react-router';
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Textarea } from '~/common/components/ui/textarea';
import { Badge } from '~/common/components/ui/badge';
import { Reply } from '~/features/community/components/reply';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Post | wemake' },
    { name: 'description', content: 'View community post' },
  ];
};

export default function PostPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-10'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community'>Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community?topic=productivity'>Productivity</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/community/postId'>
                What is the best productivity tool?
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='w-full flex items-start gap-10'>
            <Button variant={'outline'} className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>10</span>
            </Button>
            <div className='space-y-20'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>
                  What is the best productivity tool?
                </h2>
                <div className='flex items-center gap-px text-sm text-muted-foreground'>
                  <span>@jinwook</span>
                  <DotIcon className='size-4' />
                  <span>12 hours ago</span>
                  <DotIcon className='size-4' />
                  <span>10 replies</span>
                </div>
                <p className='text-muted-foreground w-full'>
                  I'm looking for a tool that can help me manage my time
                  effectively and stay organized. I've tried a few basic to-do
                  list apps but I need something more comprehensive that can
                  handle task management, time tracking, and maybe even project
                  planning. What productivity tools have worked well for you?
                  I'm particularly interested in options that integrate well
                  with other apps and have good mobile support. Any
                  recommendations would be greatly appreciated!
                </p>
              </div>
              <Form className='w-full flex items-start gap-5'>
                <Avatar className='size-14'>
                  <AvatarFallback>J</AvatarFallback>
                  <AvatarImage src='https://github.com/nvidia.png' />
                </Avatar>
                <div className='flex flex-col items-end gap-5 w-full'>
                  <Textarea
                    className='w-full resize-none'
                    placeholder='Write a reply'
                    rows={5}
                  />
                  <Button className=''>Reply</Button>
                </div>
              </Form>
              <div className='space-y-10'>
                <h4 className='font-semibold'>10 Replies</h4>
                <div className='flex flex-col gap-5'>
                  <Reply
                    username='jinwook'
                    avatarUrl='https://github.com/jinwook-song.png'
                    content="I've been using Todoist for a while and it's been great for managing my tasks. It has a nice interface and integrates well with other apps."
                    createdAt='12 hours ago'
                    topLevel={true}
                  />
                </div>
              </div>
            </div>
          </div>
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
          <div className='text-sm flex flex-col gap-2'>
            <span>🎂 Joined 3 months ago</span>
            <span>🚀 Launched 100+ products</span>
          </div>
          <Button variant={'outline'} className='w-full'>
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
