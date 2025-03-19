import type { SupaClient } from '~/supa-client';

export const createProductReview = async (
  client: SupaClient,
  {
    productId,
    userId,
    review,
    rating,
  }: {
    productId: number;
    userId: string;
    review: string;
    rating: number;
  },
) => {
  const { error } = await client.from('reviews').insert({
    product_id: productId,
    profile_id: userId,
    rating,
    review,
  });

  if (error) throw new Error(error.message);
};
