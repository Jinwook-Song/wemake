import { Form, redirect, useNavigation, useSearchParams } from 'react-router';
import type { Route } from './+types/otp-complete-page';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';
import { Loader } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Complete OTP | wemake' },
    { name: 'description', content: 'Complete OTP verification' },
  ];
};

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  otp: z.string().length(6, { message: 'OTP must be 6 digits' }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors, verifyError: null };
  }

  const { email, otp } = data;
  const { client, headers } = makeSSRClient(request);

  const { error: verifyError } = await client.auth.verifyOtp({
    email,
    token: otp,
    type: 'email',
  });
  if (verifyError)
    return { verifyError: verifyError.message, fieldErrors: null };

  return redirect('/', { headers });
};

export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Confirm OTP</h1>
          <p className='text-sm text-muted-foreground'>
            Enter the OTP sent to your email
          </p>
        </div>
        <Form method='post' className='w-full space-y-4'>
          <InputPair
            id='email'
            name='email'
            defaultValue={email || ''}
            label='Email'
            description='Enter your email'
            type='email'
            placeholder='Enter your email'
            required
            readOnly
          />
          {actionData?.fieldErrors?.email && (
            <p className='text-red-500 text-sm'>
              {actionData.fieldErrors.email}
            </p>
          )}
          <InputPair
            id='otp'
            name='otp'
            label='OTP'
            description='Enter the OTP sent to your email'
            type='text'
            placeholder='Enter the OTP'
            required
          />
          {actionData?.fieldErrors?.otp && (
            <p className='text-red-500 text-sm'>{actionData.fieldErrors.otp}</p>
          )}
          {isSubmitting ? (
            <Button type='submit' className='w-full' disabled>
              <Loader className='w-4 h-4 animate-spin' />
            </Button>
          ) : (
            <Button type='submit' className='w-full'>
              Log in
            </Button>
          )}
          {actionData?.verifyError && (
            <p className='text-red-500 text-sm'>{actionData.verifyError}</p>
          )}
        </Form>
      </div>
    </div>
  );
}
