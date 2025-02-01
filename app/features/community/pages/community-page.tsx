import { Hero } from '~/common/components/hero';
import type { Route } from './+types/community-page';
import { Form, Link, useSearchParams } from 'react-router';
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

export default function CommunityPage({}: Route.ComponentProps) {
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
                <Input
                  type='text'
                  name='search'
                  placeholder='Search for discussions'
                />
              </Form>
            </div>
            <Button asChild>
              <Link to='/community/submit'>Create a discussion</Link>
            </Button>
          </div>
          <div className='flex flex-col gap-10'>
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCard
                key={index}
                id='postId'
                title='What is the best productivity tool?'
                author='Jinwook'
                authorAvatarUrl='https://github.com/google.png'
                category='Productivity'
                createdAt='12 hours ago'
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
            {[
              'AI Tools',
              'Dev Tools',
              'Productivity Tools',
              'Design Tools',
            ].map((item) => (
              <Button key={item} variant={'link'} className='px-0' asChild>
                <Link to={`/community?topic=${item}`}>{item}</Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
