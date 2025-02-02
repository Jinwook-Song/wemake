import type { Route } from './+types/profile-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'User Profile | wemake' },
    { name: 'description', content: 'View user profile' },
  ];
};

export default function ProfilePage({}: Route.ComponentProps) {
  return (
    <div className='max-w-screen-md flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <h4 className='text-lg font-medium'>Headline</h4>
        <p className='text-sm text-muted-foreground'>I'm a product designer.</p>
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className='text-lg font-medium'>About</h4>
        <p className='text-sm text-muted-foreground'>
          I'm a product designer based in Seoul, South Korea. I'm passionate
          about creating beautiful and functional products that solve real
          problems. Currently working on wemake, a platform for makers to
          showcase their work and connect with other creators.
        </p>
      </div>
    </div>
  );
}
