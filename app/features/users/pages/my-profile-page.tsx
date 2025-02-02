import type { Route } from './+types/my-profile-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'My Profile | wemake' },
    { name: 'description', content: 'View and edit your profile' },
  ];
};

export default function MyProfilePage({}: Route.ComponentProps) {
  return <div></div>;
}
