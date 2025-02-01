import type { Route } from './+types/otp-complete-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Complete OTP | wemake' },
    { name: 'description', content: 'Complete OTP verification' },
  ];
};

export default function OtpCompletePage({}: Route.ComponentProps) {
  return <div></div>;
}
