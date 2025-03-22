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

export const createProduct = async (
  client: SupaClient,
  {
    name,
    tagline,
    description,
    howItWorks,
    url,
    iconUrl,
    categoryId,
    userId,
  }: {
    name: string;
    tagline: string;
    description: string;
    howItWorks: string;
    url: string;
    iconUrl: string;
    categoryId: number;
    userId: string;
  },
) => {
  const { data, error } = await client
    .from('products')
    .insert({
      name,
      tagline,
      description,
      how_it_works: howItWorks,
      url,
      icon: iconUrl,
      category_id: categoryId,
      profile_id: userId,
    })
    .select('product_id')
    .single();

  if (error) throw new Error(error.message);

  return data.product_id;
};
