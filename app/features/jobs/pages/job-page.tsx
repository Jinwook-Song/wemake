import type { Route } from './+types/job-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Job Details | wemake' },
    { name: 'description', content: 'View job details and apply' },
  ];
};

export default function JobPage({}: Route.ComponentProps) {
  return <div>Job Details Page</div>;
}
