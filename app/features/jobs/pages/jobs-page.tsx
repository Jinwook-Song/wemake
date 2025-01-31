import { Hero } from '~/common/components/hero';
import type { Route } from './+types/jobs-page';
import { JobCard } from '../components/job-card';
import { Button } from '~/common/components/ui/button';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from '../constants';
import { Link, useSearchParams } from 'react-router';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Jobs | wemake' },
    {
      name: 'description',
      content: 'Find the best tech jobs and opportunities',
    },
  ];
};

export default function JobsPage({}: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onFilterChange = (key: string, value: string) => {
    searchParams.set(key, value);
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
          {Array.from({ length: 10 }).map((_, index) => (
            <JobCard
              key={index}
              id='jobId'
              company='Meta'
              companyLogoUrl='https://github.com/facebook.png'
              companyHeadquarters='San Francisco, CA'
              title='Software Engineer'
              salary='$100,000 - $120,000'
              createdAt='12 hours ago'
              type='Full-time'
              positionLocation='Remote'
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
