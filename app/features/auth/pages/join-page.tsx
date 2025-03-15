import { Form, Link, redirect, useNavigation } from 'react-router';
import type { Route } from './+types/join-page';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';
import { makeSSRClient } from '~/supa-client';
import { z } from 'zod';
import { checkUsernameExists } from '../queries';
import { Loader } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Join | wemake' },
    { name: 'description', content: 'Join wemake community' },
  ];
};

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name is invalid',
    })
    .min(2, { message: 'Name must be at least 2 characters long' }),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username is invalid',
    })
    .min(2, { message: 'Username must be at least 2 characters long' }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is invalid',
    })
    .email(),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password is invalid',
    })
    .min(4, { message: 'Password must be at least 4 characters long' }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client, headers } = makeSSRClient(request);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!success) {
    return { signUpError: null, formError: error.flatten().fieldErrors };
  }

  const userNameExists = await checkUsernameExists(client, {
    username: data.username,
  });

  console.log(userNameExists);

  if (userNameExists) {
    return {
      signUpError: null,
      formError: { username: ['Username already exists'] },
    };
  }

  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });

  if (signUpError) {
    return { signUpError: signUpError.message, formError: null };
  }

  return redirect('/', { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';
  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <Button variant='ghost' asChild className='absolute top-8 right-8'>
        <Link to='/auth/login'>Login</Link>
      </Button>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <h1 className='text-2xl font-semibold'>Create an account</h1>
        <Form method='post' className='w-full space-y-4'>
          <InputPair
            id='name'
            name='name'
            label='Name'
            description='Enter your name'
            type='text'
            placeholder='Enter your name'
            required
          />
          {actionData && 'formError' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.formError?.name?.join(', ')}
            </p>
          )}
          <InputPair
            id='username'
            name='username'
            label='Username'
            description='Enter your username'
            type='text'
            placeholder='Enter your username'
            required
          />
          {actionData && 'formError' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.formError?.username?.join(', ')}
            </p>
          )}
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
          {actionData && 'signUpError' in actionData && (
            <p className='text-sm text-red-500'>{actionData.signUpError}</p>
          )}
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader className='w-4 h-4 animate-spin' />
            ) : (
              'Create account'
            )}
          </Button>
          {actionData && 'signUpError' in actionData && (
            <p className='text-sm text-red-500'>{actionData.signUpError}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
