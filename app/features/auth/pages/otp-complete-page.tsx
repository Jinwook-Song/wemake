import { Form } from 'react-router';
import type { Route } from './+types/otp-complete-page';
import { InputPair } from '~/common/components/input-pair';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Complete OTP | wemake' },
    { name: 'description', content: 'Complete OTP verification' },
  ];
};

export default function OtpCompletePage({}: Route.ComponentProps) {
  return (
    <div className='flex flex-col justify-center items-center h-full relative'>
      <div className='flex flex-col justify-center items-center gap-10 w-full max-w-md'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold'>Confirm OTP</h1>
          <p className='text-sm text-muted-foreground'>
            Enter the OTP sent to your email
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
          <InputPair
            id='otp'
            name='otp'
            label='OTP'
            description='Enter the OTP sent to your email'
            type='number'
            placeholder='Enter the OTP'
            required
          />
          <Button type='submit' className='w-full'>
            Log in
          </Button>
        </Form>
      </div>
    </div>
  );
}
