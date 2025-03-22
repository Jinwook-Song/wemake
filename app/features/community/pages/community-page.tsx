import { Hero } from '~/common/components/hero';
import type { Route } from './+types/community-page';
import { data, Form, Link, useSearchParams } from 'react-router';
import { Button } from '~/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/common/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { PERIOD_OPTIONS, SORT_OPTIONS } from '../constants';
import { Input } from '~/common/components/ui/input';
import { PostCard } from '../components/post-card';
import { getPosts, getTopics } from '../queries';
import { z } from 'zod';
import { topics } from '../schema';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Community | wemake' },
    {
      name: 'description',
      content:
        'Ask questions, share ideas, and connect with the wemake community.',
    },
  ];
};

const searchParamsSchema = z.object({
  sorting: z.enum(SORT_OPTIONS).optional().default('newest'),
  period: z.enum(PERIOD_OPTIONS).optional().default('all'),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw data(
      { message: 'Invalid params', error_code: 'INVALID_PARAMS' },
      { status: 400 },
    );
  }

  const { sorting, period, keyword, topic } = parsedData;

  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, { limit: 7, sorting, period, keyword, topic }),
  ]);
  return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { topics, posts } = loaderData;

  const [searchParams, setSearchParams] = useSearchParams();
  const sorting =
    (searchParams.get('sorting') as (typeof SORT_OPTIONS)[number]) || 'newest';
  const period =
    (searchParams.get('period') as (typeof PERIOD_OPTIONS)[number]) || 'all';

  return (
    <div>
      <Hero
        title='Community'
        description='Ask questions, share ideas, and connect with the wemake community.'
      />
      <div className='grid grid-cols-6 items-start gap-40'>
        <div className='col-span-4 space-y-10'>
          <div className='flex justify-between'>
            <div className='w-full space-y-5'>
              <div className='flex items-center gap-5'>
                <DropdownMenu>
                  <DropdownMenuTrigger className='flex items-center gap-1'>
                    <span className='text-sm capitalize'>{sorting}</span>
                    <ChevronDownIcon className='size-5' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className='capitalize cursor-pointer'
                        key={option}
                        checked={searchParams.get('sorting') === option}
                        onCheckedChange={(checked) => {
                          if (!checked) return;
                          searchParams.set('sorting', option);
                          setSearchParams(searchParams);
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === 'popular' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-1'>
                      <span className='text-sm capitalize'>{period}</span>
                      <ChevronDownIcon className='size-5' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className='capitalize cursor-pointer'
                          key={option}
                          checked={searchParams.get('period') === option}
                          onCheckedChange={(checked) => {
                            if (!checked) return;
                            searchParams.set('period', option);
                            setSearchParams(searchParams);
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className='w-2/3'>
                <Input type='hidden' name='sorting' value={sorting} />
                <Input type='hidden' name='period' value={period} />
                <Input
                  type='text'
                  name='keyword'
                  placeholder='Search for discussions'
                />
              </Form>
            </div>
            <Button asChild>
              <Link to='/community/submit'>Create a discussion</Link>
            </Button>
          </div>
          <div className='flex flex-col gap-10'>
            {posts.map((post) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                author={post.author}
                authorAvatarUrl={post.avatar}
                category={post.topic}
                createdAt={post.created_at}
                votesCount={post.upvotes}
                isUpvoted={post.is_upvoted}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className='col-span-2 space-y-8'>
          <h2 className='text-sm font-bold text-muted-foreground uppercase'>
            Topics
          </h2>
          <div className='flex flex-col items-start gap-4'>
            {topics.map((topic) => (
              <Button
                key={topic.slug}
                variant={'link'}
                className='px-0'
                asChild
              >
                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

// export function HydrateFallback() {
//   return (
//     <div>
//       <h1>Loading...</h1>
//     </div>
//   );
// }
