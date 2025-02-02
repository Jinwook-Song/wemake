import type { Route } from './+types/profile-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'User Profile | wemake' },
    { name: 'description', content: 'View user profile' },
  ];
};

export default function ProfilePage({}: Route.ComponentProps) {
  return <div>Profile Page</div>;
}
