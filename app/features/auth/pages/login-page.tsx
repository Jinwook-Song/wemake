import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/login-page';
import { InputPair } from '~/common/components/input-pair';
import { Form, Link } from 'react-router';
import AuthButtons from '../components/auth-buttons';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Sign Up | wemake' },
    { name: 'description', content: 'Create your account' },
  ];
};

export default function LoginPage({}: Route.ComponentProps) {
  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/join'>Join</Link>
      </Button>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Log in to wemake</h1>
        <Form className='w-full space-y-4'>
          <InputPair
            id='email'
            name='email'
            label='Email'
            description='Enter your email'
            type='email'
            placeholder='Enter your email'
            required
          />
          <InputPair
            id='password'
            name='password'
            label='Password'
            description='Enter your password'
            type='password'
            placeholder='Enter your password'
            required
          />
          <Button type='submit' className='w-full'>
            Log in
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
