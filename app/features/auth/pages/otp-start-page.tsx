import { Form } from 'react-router';
import type { Route } from './+types/otp-start-page';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'OTP Verification | wemake' },
    { name: 'description', content: 'Start OTP verification' },
  ];
};

export default function OtpStartPage({}: Route.ComponentProps) {
  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Log in with OTP</h1>
          <p className='text-sm text-muted-foreground'>
            We will send you a 4-digit code to your email.
          </p>
        </div>
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

          <Button type='submit' className='w-full'>
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
