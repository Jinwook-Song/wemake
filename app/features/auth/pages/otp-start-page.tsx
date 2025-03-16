import { Form, redirect, useNavigation } from 'react-router';
import type { Route } from './+types/otp-start-page';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';
import { Loader } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'OTP Verification | wemake' },
    { name: 'description', content: 'Start OTP verification' },
  ];
};

const formSchema = z.object({
  email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) return { error: 'Invalid email address' };

  const { email } = data;
  const { client } = makeSSRClient(request);
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      // 이메일 로그인 시 사용자 생성 여부
      shouldCreateUser: true,
    },
  });
  if (error) return { error: 'Failed to send OTP' };

  return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Log in with OTP</h1>
          <p className='text-sm text-muted-foreground'>
            We will send you a 4-digit code to your email.
          </p>
        </div>
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
          {actionData?.error && (
            <p className='text-red-500 text-sm'>{actionData.error}</p>
          )}
          {isSubmitting ? (
            <Button type='submit' className='w-full' disabled>
              <Loader className='w-4 h-4 animate-spin' />
            </Button>
          ) : (
            <Button type='submit' className='w-full'>
              Send OTP
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}
