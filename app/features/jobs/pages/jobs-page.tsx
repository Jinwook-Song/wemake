import { Hero } from '~/common/components/hero';
import type { Route } from './+types/jobs-page';
import { JobCard } from '../components/job-card';
import { Button } from '~/common/components/ui/button';
import {
  JOB_TYPES,
  LOCATION_TYPES,
  SALARY_RANGES,
  type JobType,
  type LocationType,
  type SalaryRange,
} from '../constants';
import { data, Link, useSearchParams } from 'react-router';
import { getJobs } from '../queries';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Jobs | wemake' },
    {
      name: 'description',
      content: 'Find the best tech jobs and opportunities',
    },
  ];
};

const searchParamsSchema = z.object({
  type: z.enum(JOB_TYPES.map((type) => type.value) as [JobType]).optional(),
  location: z
    .enum(LOCATION_TYPES.map((location) => location.value) as [LocationType])
    .optional(),
  salary: z
    .enum(SALARY_RANGES.map((salary) => salary.value) as [SalaryRange])
    .optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );
  if (!success) {
    throw data(
      { message: 'Invalid params', error_code: 'INVALID_PARAMS' },
      { status: 400 },
    );
  }

  const { type, location, salary } = parsedData;
  const jobs = await getJobs(client, { limit: 10, type, location, salary });
  return { jobs };
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs } = loaderData;
  const onFilterChange = (key: string, value: string) => {
    if (searchParams.get(key) === value) searchParams.delete(key);
    else searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  return (
    <div className='space-y-20'>
      <Hero
        title='Jobs'
        description='Find the best tech jobs and opportunities'
      />
      <div className='grid grid-cols-6 gap-20 items-start'>
        <div className='grid grid-cols-3 gap-5 col-span-4'>
          {jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              company={job.company_name}
              companyLogoUrl={job.company_logo}
              companyHeadquarters={job.company_location}
              title={job.position}
              salary={job.salary_range}
              createdAt={job.created_at}
              type={job.job_type}
              positionLocation={job.location_type}
            />
          ))}
        </div>
        <div className='col-span-2 space-y-10 sticky top-20'>
          <div className='flex flex-col gap-2 items-start'>
            <h4 className='text-sm text-muted-foreground font-bold'>Type</h4>
            <div className='flex flex-wrap gap-2'>
              {JOB_TYPES.map((type) => (
                <Button
                  className='h-8'
                  variant={
                    searchParams.get('type') === type.value
                      ? 'default'
                      : 'outline'
                  }
                  onClick={() => onFilterChange('type', type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2 items-start'>
            <h4 className='text-sm text-muted-foreground font-bold'>
              Location
            </h4>
            <div className='flex flex-wrap gap-2'>
              {LOCATION_TYPES.map((location) => (
                <Button
                  className='h-8'
                  variant={
                    searchParams.get('location') === location.value
                      ? 'default'
                      : 'outline'
                  }
                  onClick={() => onFilterChange('location', location.value)}
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-2 items-start'>
            <h4 className='text-sm text-muted-foreground font-bold'>
              Salary Range
            </h4>
            <div className='flex flex-wrap gap-2'>
              {SALARY_RANGES.map((salary) => (
                <Button
                  className='h-8'
                  variant={
                    searchParams.get('salary') === salary.value
                      ? 'default'
                      : 'outline'
                  }
                  onClick={() => onFilterChange('salary', salary.value)}
                >
                  {salary.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
