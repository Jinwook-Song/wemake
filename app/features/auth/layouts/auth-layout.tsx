import { Outlet } from 'react-router';
import type { Route } from './+types/auth-layout';
import { FlickeringGrid } from '~/common/components/ui/flickering-grid';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Auth | wemake' },
    { name: 'description', content: 'Authentication' },
  ];
};

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <div className='grid lg:grid-cols-2 h-screen px-5 sm:px-0'>
      {/* <div className='hidden lg:block bg-gradient-to-br from-primary/80 via-black to-primary/10' /> */}
      <div className='hidden lg:block'>
        <FlickeringGrid
          className='relative inset-0 z-0 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]'
          squareSize={4}
          gridGap={6}
          color='#E11D49'
          maxOpacity={0.8}
          flickerChance={0.1}
        />{' '}
      </div>
      <Outlet />
    </div>
  );
}
