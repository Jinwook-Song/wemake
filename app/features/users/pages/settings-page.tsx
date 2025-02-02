import type { Route } from './+types/settings-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Settings | wemake' },
    { name: 'description', content: 'Manage your account settings' },
  ];
};

export default function SettingsPage({}: Route.ComponentProps) {
  return <div></div>;
}
