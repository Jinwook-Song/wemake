import { Button } from '~/common/components/ui/button';
import type { Route } from './+types/login-page';
import { InputPair } from '~/common/components/input-pair';
import { Form, Link, redirect, useNavigation } from 'react-router';
import AuthButtons from '../components/auth-buttons';
import { Loader } from 'lucide-react';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Sign Up | wemake' },
    { name: 'description', content: 'Create your account' },
  ];
};

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is invalid',
    })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'Password must be at least 4 characters long' }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client, headers } = makeSSRClient(request);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!success) {
    return {
      formError: error.flatten().fieldErrors,
      loginError: null,
    };
  }

  const { email, password } = data;

  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return {
      formError: null,
      loginError: loginError.message,
    };
  }

  return redirect('/', { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/join'>Join</Link>
      </Button>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Log in to wemake</h1>
        <Form method='post' className='w-full space-y-4'>
          <InputPair
            id='email'
            name='email'
            label='Email'
            description='Enter your email'
            type='email'
            placeholder='Enter your email'
            required
          />
          {actionData && 'formError' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.formError?.email?.join(', ')}
            </p>
          )}
          <InputPair
            id='password'
            name='password'
            label='Password'
            description='Enter your password'
            type='password'
            placeholder='Enter your password'
            required
          />
          {actionData && 'formError' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.formError?.password?.join(', ')}
            </p>
          )}
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className='w-4 h-4 animate-spin' />
            ) : (
              'Log in'
            )}
          </Button>
          {actionData && 'loginError' in actionData && (
            <p className='text-sm text-red-500'>{actionData.loginError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
