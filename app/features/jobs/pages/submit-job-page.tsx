import type { Route } from './+types/submit-job-page';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit a Job | wemake' },
    { name: 'description', content: 'Post a new job listing' },
  ];
};

export default function SubmitJobPage({}: Route.ComponentProps) {
  return <div>Submit Job Page</div>;
}
