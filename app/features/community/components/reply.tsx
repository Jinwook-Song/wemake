import { DotIcon, Loader, MessageCircleIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Form, Link, useActionData, useNavigation } from 'react-router';
import { useEffect, useState } from 'react';
import { Textarea } from '~/common/components/ui/textarea';
import { DateTime } from 'luxon';
import { useAuth } from '~/hooks/use-auth';
import type { action } from '../pages/post-page';

interface ReplyProps {
  name: string;
  username: string;
  avatarUrl: string | null;
  content: string;
  createdAt: string;
  topLevel: boolean;
  topLevelId?: number;
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
  name,
  username,
  avatarUrl,
  content,
  createdAt,
  topLevel,
  topLevelId,
  replies,
}: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);

  const { isLoggedIn, name: loggedInName, avatar } = useAuth();

  const navigation = useNavigation();

  const isSubmitting =
    (navigation.state === 'submitting' &&
      navigation.formData?.get('topLevelId') !== null) ||
    navigation.state === 'loading';

  useEffect(() => {
    if (actionData?.ok) setReplying(false);
  }, [actionData?.ok]);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex items-start gap-5'>
        <Avatar className='size-14'>
          <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          {avatarUrl && <AvatarImage src={avatarUrl} />}
        </Avatar>
        <div className='flex flex-col gap-2 items-start w-full'>
          <div className='flex gap-px items-center'>
            <Link to={`/users/@${username}`}>
              <h4 className='font-medium'>{name}</h4>
            </Link>
            <DotIcon className='size-4' />
            <span className='text-xs text-muted-foreground'>
              {DateTime.fromISO(createdAt).toRelative()}
            </span>
          </div>
          <p className='text-muted-foreground w-2/3'>{content}</p>
          {isLoggedIn && (
            <Button
              variant={'ghost'}
              className='self-end'
              onClick={toggleReplying}
            >
              <MessageCircleIcon className='size-4' />
              Reply
            </Button>
          )}
        </div>
      </div>
      {replying && (
        <Form method='post' className='w-full flex items-start gap-5'>
          <input type='hidden' name='topLevelId' value={topLevelId} />
          <Avatar className='size-14'>
            <AvatarFallback>{loggedInName?.[0]}</AvatarFallback>
            <AvatarImage src={avatar} />
          </Avatar>
          <div className='flex flex-col items-end gap-5 w-full'>
            <Textarea
              name='reply'
              className='w-full resize-none'
              placeholder='Write a reply'
              defaultValue={`@${username}`}
              rows={5}
            />
            <Button className='min-w-20' type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className='size-4 animate-spin' />
              ) : (
                'Reply'
              )}
            </Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className='pl-16 w-full'>
          {replies.map((reply) => (
            <Reply
              key={reply.post_reply_id}
              name={reply.user.name}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              createdAt={reply.created_at}
              topLevel={false}
              topLevelId={topLevelId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
