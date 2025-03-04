import type { DateTime } from 'luxon';
import client from '~/supa-client';

export const getProductsByDateRnage = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
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
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return data;
};
