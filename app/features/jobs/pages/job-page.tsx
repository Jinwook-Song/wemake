import { Badge } from '~/common/components/ui/badge';
import type { Route } from './+types/job-page';
import { DotIcon } from 'lucide-react';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Job Details | wemake' },
    { name: 'description', content: 'View job details and apply' },
  ];
};

export default function JobPage({}: Route.ComponentProps) {
  return (
    <div>
      <div className='w-full h-60 bg-gradient-to-tr from-primary/80 to-primary/10 rounded-lg'></div>
      <div className='grid grid-cols-6 gap-20 items-start -mt-20'>
        <div className='col-span-4 space-y-8'>
          <div className='space-y-2'>
            <div className='size-40 bg-white rounded-full overflow-hidden relative left-10'>
              <img
                src='https://github.com/facebook.png'
                alt='company logo'
                className='object-cover'
              />
            </div>
            <h1 className='text-4xl font-bold'>Software Engineer</h1>
            <p className='text-lg text-muted-foreground'>Meta Inc.</p>
          </div>
          <div className='flex gap-2 items-center'>
            <Badge variant='secondary'>Full-time</Badge>
            <Badge variant='secondary'>Remote</Badge>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Overview</h4>
            <p className='text-lg'>
              We are looking for a software engineer to join our team. You will
              be responsible for developing and maintaining our software
              applications.
            </p>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Responsibilities</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                'Develop frontend and backend applications',
                'Optimize code quality and performance',
                'Collaborate with team members and participate in code reviews',
                'Implement new technologies and design architecture',
                'Resolve production issues and maintain systems',
                'Create technical documentation and design APIs',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Qualifications</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                'Bachelor’s degree in Computer Science or related field',
                '3+ years of experience in software development',
                'Strong understanding of JavaScript, TypeScript, and React',
                'Experience with Node.js, Express, and MongoDB',
                'Familiarity with Git, Docker, and Kubernetes',
                'Ability to work in a fast-paced, collaborative environment',
                'Excellent problem-solving skills and attention to detail',
                'Excellent communication skills and ability to work in a team',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Benefits</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                'Competitive salary',
                'Flexible working hours',
                'Remote work options',
                'Health insurance',
                'Dental insurance',
                'Vision insurance',
                '401(k) retirement plan',
                'Paid time off',
                'Employee assistance program',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='space-y-2'>
            <h4 className='text-2xl font-bold'>Skills</h4>
            <ul className='text-lg list-disc list-inside'>
              {[
                'JavaScript',
                'TypeScript',
                'React',
                'Node.js',
                'Express',
                'MongoDB',
                'Git',
                'Docker',
                'Kubernetes',
                'AWS',
                'CI/CD',
                'Unit Testing',
                'Integration Testing',
                'End-to-End Testing',
                'Performance Testing',
                'Security Testing',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='col-span-2 sticky top-20 border rounded-lg mt-40 p-6 space-y-4'>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Avg. Salary</span>
            <span className='text-2xl font-medium'>$100,000 - $120,000</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Location</span>
            <span className='text-2xl font-medium'>Remote</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground'>Type</span>
            <span className='text-2xl font-medium'>Full-time</span>
          </div>
          <div className='flex'>
            <span className='text-sm text-muted-foreground'>
              Posted 2 days ago
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
