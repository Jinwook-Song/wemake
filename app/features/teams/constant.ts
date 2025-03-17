export const PRODUCT_STAGES = [
  { label: 'Idea', value: 'idea' },
  { label: 'Prototype', value: 'prototype' },
  { label: 'Development', value: 'development' },
  { label: 'MVP', value: 'mvp' },
  { label: 'Launched', value: 'launched' },
] as const;

export type ProductStage = (typeof PRODUCT_STAGES)[number]['value'];
