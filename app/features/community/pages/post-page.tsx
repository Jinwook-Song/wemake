import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb';
import type { Route } from './+types/post-page';
import {
  Form,
  Link,
  useFetcher,
  useNavigation,
  useOutletContext,
} from 'react-router';
import { ChevronUpIcon, DotIcon, Loader } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';
import { Textarea } from '~/common/components/ui/textarea';
import { Badge } from '~/common/components/ui/badge';
import { Reply } from '~/features/community/components/reply';
import { getPostById, getPostReplies } from '../queries';
import { DateTime } from 'luxon';
import { makeSSRClient } from '~/supa-client';
import { z } from 'zod';
import { createReply } from '../mutations';
import { getCurrentUserId } from '~/features/users/queries';
import { useRef } from 'react';
import { useAuth } from '~/hooks/use-auth';
import { cn } from '~/lib/utils';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Post | wemake' },
    { name: 'description', content: 'View community post' },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const post = await getPostById(client, { postId: params.postId });
  const replies = await getPostReplies(client, { postId: params.postId });
  return { post, replies };
}

const formSchema = z.object({
  reply: z.string().min(1),
  topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) return { ok: false, fieldErrors: error.flatten().fieldErrors };
  const { reply, topLevelId } = data;
  await createReply(client, {
    reply,
    postId: +params.postId,
    userId,
    topLevelId,
  });

  return {
    ok: true,
    fieldErrors: null,
  };
};

export default function PostPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { post, replies } = loaderData;
  const fetcher = useFetcher();

  const { isLoggedIn, name, avatar } = useAuth();

  const navigation = useNavigation();
  const isSubmitting =
    (navigation.state === 'submitting' &&
      navigation.formData?.get('topLevelId') === null) ||
    navigation.state === 'loading';

  const formRef = useRef<HTMLFormElement>(null);

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
              <Link to={`/community?topic=${post.topic_slug}`}>
                {post.topic_name}
              </Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/post/${post.post_id}`}>{post.title}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 space-y-10'>
          <div className='w-full flex items-start gap-10'>
            <fetcher.Form
              method='post'
              action={`/community/${post.post_id}/upvote`}
            >
              <input type='hidden' name='postId' value={post.post_id} />
              <Button
                variant={'outline'}
                className={cn(
                  'flex flex-col h-14',
                  post.is_upvoted && 'bg-primary text-primary-foreground',
                )}
              >
                <ChevronUpIcon className='size-4 shrink-0' />
                <span>{post.upvotes}</span>
              </Button>
            </fetcher.Form>
            <div className='space-y-20 w-full'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>{post.title}</h2>
                <div className='flex items-center gap-px text-sm text-muted-foreground'>
                  <span>{post.author_name}</span>
                  <DotIcon className='size-4' />
                  <span>{DateTime.fromISO(post.created_at).toRelative()}</span>
                  <DotIcon className='size-4' />
                  <span>{post.replies_count} replies</span>
                </div>
                <p className='text-muted-foreground w-full'>{post.content}</p>
              </div>
              {isLoggedIn && (
                <Form
                  ref={(node) => {
                    formRef.current = node;
                    if (actionData?.ok) formRef.current?.reset();
                  }}
                  method='post'
                  className='w-full flex items-start gap-5'
                >
                  {/* FIXME: LOGGED IN USER */}
                  <Avatar className='size-14'>
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                    <AvatarImage src={avatar} />
                  </Avatar>
                  <div className='flex flex-col items-end gap-5 w-full'>
                    <Textarea
                      name='reply'
                      className='w-full resize-none'
                      placeholder='Write a reply'
                      rows={5}
                    />
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='min-w-20'
                    >
                      {isSubmitting ? (
                        <Loader className='size-4 animate-spin' />
                      ) : (
                        'Reply'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
              <div className='space-y-10'>
                <h4 className='font-semibold'>{post.replies_count} Replies</h4>
                <div className='flex flex-col gap-5'>
                  {replies.map((reply) => (
                    <Reply
                      name={reply.user.name}
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      createdAt={reply.created_at}
                      topLevel={true}
                      topLevelId={reply.post_reply_id}
                      // @ts-ignore
                      replies={reply.children}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className='col-span-2 border rounded-lg shadow-md p-6 space-y-4'>
          <div className='flex gap-5'>
            <Avatar className='size-14'>
              <AvatarFallback>{post.author_name[0]}</AvatarFallback>
              {post.author_avatar && <AvatarImage src={post.author_avatar} />}
            </Avatar>
            <div className='flex flex-col items-start'>
              <h4 className='text-lg font-medium'>{post.author_name}</h4>
              <Badge variant={'secondary'} className='capitalize'>
                {post.author_role}
              </Badge>
            </div>
          </div>
          <div className='text-sm flex flex-col gap-2'>
            <span>
              🎂 Joined {DateTime.fromISO(post.author_created_at).toRelative()}
            </span>
            <span>🚀 Launched {post.product_count} products</span>
          </div>
          <Button variant={'outline'} className='w-full'>
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
