import { Badge } from '~/common/components/ui/badge';
import type { Route } from './+types/job-page';
import { DotIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';
import { getJobById } from '../queries';
import { DateTime } from 'luxon';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Job Details | wemake' },
    { name: 'description', content: 'View job details and apply' },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { jobId } = params;
  const job = await getJobById(jobId);
  return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
  const { job } = loaderData;
  return (
    <div>
      <div className='w-full h-60 bg-gradient-to-tr from-primary/80 to-primary/10 rounded-lg'></div>
      <div className='grid grid-cols-6 gap-20 items-start -mt-20'>
        <div className='col-span-4 space-y-8'>
          <div className='space-y-2'>
            <div className='size-40 bg-white rounded-full overflow-hidden relative left-10'>
              <img
                src={job.company_logo}
                alt='company logo'
                className='object-cover'
              />
            </div>
            <h1 className='text-4xl font-bold'>{job.position}</h1>
            <p className='text-lg text-muted-foreground'>{job.company_name}</p>
          </div>
          <div className='flex gap-2 items-center capitalize'>
            <Badge variant='secondary'>{job.job_type}</Badge>
            <Badge variant='secondary'>{job.location_type}</Badge>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Overview</h4>
            <p className='text-lg'>{job.overview}</p>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Responsibilities</h4>
            <ul className='text-lg list-disc list-inside'>
              {job.responsibilities.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Qualifications</h4>
            <ul className='text-lg list-disc list-inside'>
              {job.qualifications.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Benefits</h4>
            <ul className='text-lg list-disc list-inside'>
              {job.benefits.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Skills</h4>
            <ul className='text-lg list-disc list-inside'>
              {job.skills.split(',').map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-span-2 sticky top-20 border rounded-lg mt-40 p-6 space-y-4'>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Avg. Salary</span>
            <span className='text-2xl font-medium'>{job.salary_range}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Location</span>
            <span className='text-2xl font-medium capitalize'>
              {job.company_location}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Type</span>
            <span className='text-2xl font-medium capitalize'>
              {job.job_type}
            </span>
          </div>
          <div className='flex'>
            <span className='text-sm text-muted-foreground'>
              Posted {DateTime.fromISO(job.created_at).toRelative()}
            </span>
            <DotIcon className='size-4' />
            <span className='text-sm text-muted-foreground'>28 views</span>
          </div>
          <Button className='w-full'>Apply</Button>
        </div>
      </div>
    </div>
  );
}
