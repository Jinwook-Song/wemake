import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb';
import type { Route } from './+types/post-page';
import { Form, Link } from 'react-router';
import { ChevronUpIcon, DotIcon } from 'lucide-react';
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

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Post | wemake' },
    { name: 'description', content: 'View community post' },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPostById(params.postId);
  const replies = await getPostReplies(params.postId);
  return { post, replies };
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post, replies } = loaderData;
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
            <Button variant={'outline'} className='flex flex-col h-14'>
              <ChevronUpIcon className='size-4 shrink-0' />
              <span>{post.upvotes}</span>
            </Button>
            <div className='space-y-20 w-full'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold'>{post.title}</h2>
                <div className='flex items-center gap-px text-sm text-muted-foreground'>
                  <span>{post.author_name}</span>
                  <DotIcon className='size-4' />
                  <span>
                    {DateTime.fromISO(post.author_created_at).toRelative()}
                  </span>
                  <DotIcon className='size-4' />
                  <span>{post.replies_count} replies</span>
                </div>
                <p className='text-muted-foreground w-full'>{post.content}</p>
              </div>
              <Form className='w-full flex items-start gap-5'>
                {/* FIXME: LOGGED IN USER */}
                <Avatar className='size-14'>
                  <AvatarFallback>J</AvatarFallback>
                  <AvatarImage src={post.author_avatar} />
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
                <h4 className='font-semibold'>{post.replies_count} Replies</h4>
                <div className='flex flex-col gap-5'>
                  {replies.map((reply) => (
                    <Reply
                      username={reply.user.username}
                      avatarUrl={reply.user.avatar}
                      content={reply.reply}
                      createdAt={reply.created_at}
                      topLevel={true}
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
