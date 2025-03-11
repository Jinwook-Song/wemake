import client from '~/supa-client';
import type { JobType, LocationType, SalaryRange } from './constants';

export const getJobs = async ({
  limit,
  type,
  location,
  salary,
}: {
  limit: number;
  type?: JobType;
  location?: LocationType;
  salary?: SalaryRange;
}) => {
  const baseQuery = client
    .from('jobs')
    .select(
      `
        job_id,
        position,
        overview,
        company_name,
        company_logo,
        company_location,
        job_type,
        location_type,
        salary_range,
        created_at
      `,
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type) {
    baseQuery.eq('job_type', type);
  }

  if (location) {
    baseQuery.eq('location_type', location);
  }

  if (salary) {
    baseQuery.eq('salary_range', salary);
  }

  const { data, error } = await baseQuery;

  if (error) throw error;
  return data;
};
