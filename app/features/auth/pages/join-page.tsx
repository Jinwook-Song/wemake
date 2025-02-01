import { Form, Link } from 'react-router';
import type { Route } from './+types/join-page';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Join | wemake' },
    { name: 'description', content: 'Join wemake community' },
  ];
};

export default function JoinPage({}: Route.ComponentProps) {
  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/login'>Login</Link>
      </Button>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Create an account</h1>
        <Form className='w-full space-y-4'>
          <InputPair
            id='name'
            name='name'
            label='Name'
            description='Enter your name'
            type='text'
            placeholder='Enter your name'
            required
          />
          <InputPair
            id='username'
            name='username'
            label='Username'
            description='Enter your username'
            type='text'
            placeholder='Enter your username'
            required
          />
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
            Create account
          </Button>
        </Form>
      </div>
    </div>
  );
}
