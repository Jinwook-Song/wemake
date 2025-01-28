import { Link, type MetaFunction } from 'react-router';
import { ProductCard } from '~/features/products/components/product-card';
import { Button } from '../components/ui/button';
import { PostCard } from '~/features/community/components/post-card';
import { IdeaCard } from '~/features/ideas/components/idea-card';
import { JobCard } from '~/features/jobs/components/job-card';
import { TeamCard } from '~/features/teams/components/team-card';

export const meta: MetaFunction = () => {
  return [
    { title: 'Home | wemake' },
    { name: 'description', content: 'Welcome to wemake' },
  ];
};

export const loader = async () => {
  return {
    hello: 'world',
  };
};

export default function HomePage({ loaderData }: any) {
  return (
    <div className='px-20 space-y-40'>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Today's Products {JSON.stringify(loaderData)}
          </h2>
          <p className='text-xl font-light text-foreground'>
            The best products made by our community today.
          </p>
          <Button variant={'link'} asChild className='text-lg p-0'>
            <Link to={'/products/leaderboards'}>
              Explore all products &rarr;
            </Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id='productId'
            name='Product Name'
            description='Product Description'
            commentsCount={12}
            viewsCount={12}
            upvotesCount={120}
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Latest Discussions
          </h2>
          <p className='text-xl font-light text-foreground'>
            The latest discussions from our community.
          </p>
          <Button variant={'link'} asChild className='text-lg p-0'>
            <Link to={'/community'}>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostCard
            key={index}
            id='postId'
            title='What is the best productivity tool?'
            author='Jinwook'
            authorAvatarUrl='https://github.com/apple.png'
            category='Productivity'
            createdAt='12 hours ago'
          />
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            IdeasGPT
          </h2>
          <p className='text-xl font-light text-foreground'>
            Find ideas for your next project
          </p>
          <Button variant={'link'} asChild className='text-lg p-0'>
            <Link to={'/community'}>Explore all discussions &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={index}
            id='ideaId'
            title='A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as a web dashboard to track progress and see insights.'
            viewCount={123}
            createdAt='12 hours ago'
            likesCount={12}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Latest Jobs
          </h2>
          <p className='text-xl font-light text-foreground'>
            Find your dream job.
          </p>
          <Button variant={'link'} asChild className='text-lg p-0'>
            <Link to={'/jobs'}>Explore all jobs &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCard
            key={index}
            id='jobId'
            company='Meta'
            companyLogoUrl='https://github.com/facebook.png'
            companyHeadquarters='San Francisco, CA'
            title='Software Engineer'
            salary='$100,000 - $120,000'
            createdAt='12 hours ago'
            type='Full-time'
            positionLocation='Remote'
          />
        ))}
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <div>
          <h2 className='text-5xl font-bold leading-tight tracking-tight'>
            Find a team mate.
          </h2>
          <p className='text-xl font-light text-foreground'>
            Join a team looking for a new member.
          </p>
          <Button variant={'link'} asChild className='text-lg p-0'>
            <Link to={'/teams'}>Explore all teams &rarr;</Link>
          </Button>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <TeamCard
            key={index}
            id='teamId'
            leaderUsername='jinwook'
            leaderAvatarUrl='https://github.com/jinwook-song.png'
            positions={[
              'React Developer',
              'Backend Developer',
              'Product Manager',
            ]}
            projectDescription='a new social media platform'
          />
        ))}
      </div>
    </div>
  );
}
