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
import { DateTime } from 'luxon';

interface ReplyProps {
  username: string;
  avatarUrl: string | null;
  content: string;
  createdAt: string;
  topLevel: boolean;
  replies?: {
    post_reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      avatar: string | null;
      username: string;
    };
  }[];
}

export function Reply({
  username,
  avatarUrl,
  content,
  createdAt,
  topLevel,
  replies,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex items-start gap-5'>
        <Avatar className='size-14'>
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
        </Avatar>
        <div className='flex flex-col gap-2 items-start w-full'>
          <div className='flex gap-px items-center'>
            <Link to={`/users/@${username}`}>
              <h4 className='font-medium'>{username}</h4>
            </Link>
            <DotIcon className='size-4' />
            <span className='text-xs text-muted-foreground'>
              {DateTime.fromISO(createdAt).toRelative()}
            </span>
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
      {topLevel && replies && (
        <div className='pl-16 w-full'>
          {replies.map((reply) => (
            <Reply
              key={reply.post_reply_id}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              createdAt={reply.created_at}
              topLevel={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
