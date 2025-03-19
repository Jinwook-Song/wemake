export const USER_ROLES = [
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Marketer', value: 'marketer' },
  { label: 'Founder', value: 'founder' },
  { label: 'Product Manager', value: 'product-manager' },
] as const;

export type UserRole = (typeof USER_ROLES)[number]['value'];
