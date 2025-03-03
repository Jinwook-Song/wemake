import type { DateTime } from 'luxon';
import client from '~/supa-client';

export const getProductsByDateRnage = async ({
  startDate,
  endDate,
  limit,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
}) => {
  const { data, error } = await client
    .from('products')
    .select(
      `
        product_id,
        name,
        description,
        upvotes:stats->>upvotes,
        views:stats->>views,
        reviews:stats->>reviews
        `,
    )
    .order('stats->>upvotes', { ascending: false })
    .gte('created_at', startDate.toISO())
    .lte('created_at', endDate.toISO())
    .limit(limit);

  if (error) throw error;

  return data;
};
