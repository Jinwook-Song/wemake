export const JOB_TYPES = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
] as const;

export const LOCATION_TYPES = [
  { label: 'Remote', value: 'remote' },
  { label: 'In-person', value: 'in-person' },
  { label: 'Hybrid', value: 'hybrid' },
] as const;

export const SALARY_RANGES = [
  { label: '$0 - $50,000', value: '0-50000' },
  { label: '$50,000 - $100,000', value: '50000-100000' },
  { label: '$100,000 - $150,000', value: '100000-150000' },
  { label: '$150,000 - $200,000', value: '150000-200000' },
] as const;
