import type { z } from 'zod';
import type { SupaClient } from '~/supa-client';
import type { formSchema } from './pages/submit-job-page';

export const createJob = async (
  client: SupaClient,
  data: z.infer<typeof formSchema>,
  userId: string,
) => {
  const { data: jobData, error } = await client
    .from('jobs')
    .insert({
      position: data.position,
      overview: data.overview,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      benefits: data.benefits,
      skills: data.skills,
      company_name: data.companyName,
      company_logo: data.companyLogoUrl,
      company_location: data.companyLocation,
      apply_url: data.applyUrl,
      job_type: data.jobType,
      location_type: data.jobLocation,
      salary_range: data.salaryRange,
      profile_id: userId,
    })
    .select('job_id')
    .single();

  if (error) throw new Error(error.message);
  return jobData;
};
