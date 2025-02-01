import { Outlet } from 'react-router';
import type { Route } from './+types/auth-layout';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Auth | wemake' },
    { name: 'description', content: 'Authentication' },
  ];
};

export default function AuthLayout({}: Route.ComponentProps) {
  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='bg-gradient-to-br from-primary/80 via-black to-primary/10' />
      <Outlet />
    </div>
  );
}
