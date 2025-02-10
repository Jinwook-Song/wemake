export const JOB_TYPES = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Freelance', value: 'freelance' },
  { label: 'Internship', value: 'internship' },
] as const;

export const LOCATION_TYPES = [
  { label: 'Remote', value: 'remote' },
  { label: 'In-person', value: 'in-person' },
  { label: 'Hybrid', value: 'hybrid' },
] as const;

export const SALARY_RANGES = [
  { label: '$0 - $50,000', value: '$0 - $50,000' },
  { label: '$50,000 - $100,000', value: '$50,000 - $100,000' },
  { label: '$100,000 - $150,000', value: '$100,000 - $150,000' },
  { label: '$150,000 - $200,000', value: '$150,000 - $200,000' },
  { label: '$200,000 - $250,000', value: '$200,000 - $250,000' },
  { label: '$250,000+', value: '$250,000+' },
] as const;
