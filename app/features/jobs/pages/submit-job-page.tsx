import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-job-page';
import { Form, redirect, useNavigation } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import {
  JOB_TYPES,
  LOCATION_TYPES,
  SALARY_RANGES,
  type JobType,
  type LocationType,
  type SalaryRange,
} from '../constants';
import { Button } from '~/common/components/ui/button';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '~/features/users/queries';
import { z } from 'zod';
import { createJob } from '../mutations';
import { Loader } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Post a Job | wemake' },
    { name: 'description', content: 'Post a new job listing' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getCurrentUserId(client);
};

export const formSchema = z.object({
  position: z.string().min(1).max(40),
  overview: z.string().min(1).max(400),
  responsibilities: z.string().min(1).max(400),
  qualifications: z.string().min(1).max(400),
  benefits: z.string().min(1).max(400),
  skills: z.string().min(1).max(400),
  companyName: z.string().min(1).max(40),
  companyLogoUrl: z.string().min(1).max(40),
  companyLocation: z.string().min(1).max(40),
  applyUrl: z.string().min(1).max(40),
  jobType: z.enum(JOB_TYPES.map((type) => type.value) as [JobType]),
  jobLocation: z.enum(
    LOCATION_TYPES.map((location) => location.value) as [LocationType],
  ),
  salaryRange: z.enum(
    SALARY_RANGES.map((range) => range.value) as [SalaryRange],
  ),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) return { fieldErrors: error.flatten().fieldErrors };
  const { job_id } = await createJob(client, data, userId);
  return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <div>
      <Hero
        title='Post a Job'
        description='Reach the right candidates with wemake.'
      />
      <Form
        method='post'
        className='max-w-screen-2xl mx-auto flex flex-col items-center gap-10'
      >
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.position?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.overview?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.responsibilities?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.qualifications?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.benefits?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.skills?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.companyName?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.companyLogoUrl?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.companyLocation?.join(', ')}
            </p>
          )}
          <InputPair
            id='applyUrl'
            name='applyUrl'
            label='Apply URL'
            description='(40 characters max)'
            maxLength={40}
            type='url'
            required
            placeholder='i.e. https://wemake.com/apply'
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.applyUrl?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.jobType?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.jobLocation?.join(', ')}
            </p>
          )}
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
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.salaryRange?.join(', ')}
            </p>
          )}
        </div>
        <Button
          type='submit'
          size='lg'
          className='w-full max-w-sm mx-auto'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader className='w-4 h-4 animate-spin' />
          ) : (
            'Post job for $100'
          )}
        </Button>
      </Form>
    </div>
  );
}
