import { DotIcon, MessageCircleIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Form, Link } from 'react-router';
import { useState } from 'react';
import { Textarea } from '~/common/components/ui/textarea';

interface ReplyProps {
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  topLevel: boolean;
}

export function Reply({
  username,
  avatarUrl,
  content,
  createdAt,
  topLevel,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start gap-5'>
        <Avatar className='size-14'>
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          <AvatarImage src={avatarUrl} />
        </Avatar>
        <div className='flex flex-col gap-2 items-start'>
          <div className='flex gap-px items-center'>
            <Link to={`/users/@${username}`}>
              <h4 className='font-medium'>{username}</h4>
            </Link>
            <DotIcon className='size-4' />
            <span className='text-xs text-muted-foreground'>{createdAt}</span>
          </div>
          <p className='text-muted-foreground w-2/3'>{content}</p>
          <Button
            variant={'ghost'}
            className='self-end'
            onClick={toggleReplying}
          >
            <MessageCircleIcon className='size-4' />
            Reply
          </Button>
        </div>
      </div>
      {replying && (
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
      )}
      {topLevel && (
        <div className='pl-16 w-full'>
          <Reply
            username='jinwook'
            avatarUrl='https://github.com/jinwook-song.png'
            content="I've been using Todoist for a while and it's been great for managing my tasks. It has a nice interface and integrates well with other apps."
            createdAt='12 hours ago'
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
