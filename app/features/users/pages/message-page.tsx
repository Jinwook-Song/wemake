import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import type { Route } from './+types/message-page';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Form } from 'react-router';
import { Textarea } from '~/common/components/ui/textarea';
import { Button } from '~/common/components/ui/button';
import { SendIcon } from 'lucide-react';
import { MessageBubble } from '../components/message-bubble';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Message | wemake' },
    { name: 'description', content: 'View message details' },
  ];
};

export default function MessagePage({}: Route.ComponentProps) {
  return (
    <div className='h-full flex flex-col relative'>
      <Card className='absolute w-full top-0 bg-card/50 z-10 backdrop-blur'>
        <CardHeader className='flex flex-row gap-4 items-center bg-transparent'>
          <Avatar className='size-14'>
            <AvatarFallback>J</AvatarFallback>
            <AvatarImage src='https://github.com/jinwook-song.png' />
          </Avatar>
          <div className='flex flex-col'>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className='overflow-y-auto pt-10 flex flex-col gap-4 grow mt-20'>
        {Array.from({ length: 19 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl='https://github.com/jinwook-song.png'
            username='John Doe'
            message='This is a longer message from John Doe discussing various topics and sharing updates about their day. Hope you are doing well!'
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card className='fixed w-[calc(100%-16rem)] bottom-0 left-0 right-0 ml-auto bg-transparent hover:bg-card/50 focus-within:bg-card/50'>
        <CardHeader>
          <Form className='relative flex justify-end items-center'>
            <Textarea
              placeholder='Write a message...'
              rows={2}
              className='resize-none'
            />
            <Button type='submit' size={'icon'} className='absolute right-4'>
              <SendIcon size={12} />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
