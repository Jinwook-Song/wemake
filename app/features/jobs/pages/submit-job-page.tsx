import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-job-page';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from '../constants';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Post a Job | wemake' },
    { name: 'description', content: 'Post a new job listing' },
  ];
};

export default function SubmitJobPage({}: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title='Post a Job'
        description='Reach the right candidates with wemake.'
      />
      <Form className='max-w-screen-2xl mx-auto flex flex-col items-center gap-10'>
        <div className='w-full grid grid-cols-3 gap-10'>
          <InputPair
            id='position'
            name='position'
            label='Position'
            description='(40 characters max)'
            maxLength={40}
            type='text'
            required
            placeholder='i.e. Frontend Developer'
          />
          <InputPair
            id='overview'
            name='overview'
            label='Overview'
            description='(400 characters max)'
            maxLength={400}
            type='text'
            required
            placeholder='i.e. We are looking for a Frontend Developer to join our team.'
            textArea
          />
          <InputPair
            id='responsibilities'
            name='responsibilities'
            label='Responsibilities'
            description='(400 characters max, comma separated)'
            maxLength={400}
            type='text'
            required
            placeholder='i.e. Implement UI, Develop features, etc.'
            textArea
          />
          <InputPair
            id='qualifications'
            name='qualifications'
            label='Qualifications'
            description='(400 characters max, comma separated)'
            maxLength={400}
            type='text'
            required
            placeholder='i.e. 3+ years of experience, Bachelor’s degree, etc.'
            textArea
          />
          <InputPair
            id='benefits'
            name='benefits'
            label='Benefits'
            description='(400 characters max, comma separated)'
            maxLength={400}
            type='text'
            required
            placeholder='i.e. Health insurance, Dental insurance, etc.'
            textArea
          />
          <InputPair
            id='skills'
            name='skills'
            label='Skills'
            description='(400 characters max, comma separated)'
            maxLength={400}
            type='text'
            required
            placeholder='i.e. React, TypeScript, etc.'
            textArea
          />
          <InputPair
            id='companyName'
            name='companyName'
            label='Company Name'
            description='(40 characters max)'
            maxLength={40}
            type='text'
            required
            placeholder='i.e. wemake'
          />
          <InputPair
            id='companyLogoUrl'
            name='companyLogoUrl'
            label='Company Logo URL'
            description='(40 characters max)'
            maxLength={40}
            type='url'
            required
            placeholder='i.e. https://wemake.com/logo.png'
          />
          <InputPair
            id='companyLocation'
            name='companyLocation'
            label='Company Location'
            description='(40 characters max)'
            maxLength={40}
            type='text'
            required
            placeholder='i.e. Remote, Seoul, etc.'
          />
          <InputPair
            id='applyUrl    '
            name='applyUrl'
            label='Apply URL'
            description='(40 characters max)'
            maxLength={40}
            type='url'
            required
            placeholder='i.e. https://wemake.com/apply'
          />
          <SelectPair
            name='jobType'
            label='Job Type'
            description='(40 characters max)'
            required
            placeholder='i.e. Full-time'
            options={JOB_TYPES.map((type) => ({
              value: type.value,
              label: type.label,
            }))}
          />
          <SelectPair
            name='jobLocation'
            label='Job Location'
            description='(40 characters max)'
            required
            placeholder='i.e. Remote, Seoul, etc.'
            options={LOCATION_TYPES.map((location) => ({
              value: location.value,
              label: location.label,
            }))}
          />
          <SelectPair
            name='salaryRange'
            label='Salary Range'
            description='(40 characters max)'
            required
            placeholder='i.e. $100,000 - $120,000'
            options={SALARY_RANGES.map((range) => ({
              value: range.value,
              label: range.label,
            }))}
          />
        </div>
        <Button type='submit' size='lg' className='w-full max-w-sm mx-auto'>
          Post job for $100
        </Button>
      </Form>
    </div>
  );
}
