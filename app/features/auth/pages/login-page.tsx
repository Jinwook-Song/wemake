import type { Route } from './+types/login-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Sign Up | wemake' },
    { name: 'description', content: 'Create your account' },
  ];
};

export default function LoginPage({}: Route.ComponentProps) {
  return <div></div>;
}
