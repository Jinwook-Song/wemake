import type { Route } from './+types/otp-start-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'OTP Verification | wemake' },
    { name: 'description', content: 'Start OTP verification' },
  ];
};

export default function OtpStartPage({}: Route.ComponentProps) {
  return <div></div>;
}
