import type { DateTime } from 'luxon';
import client from '~/supa-client';
import { PRODUCTS_PER_PAGE } from './constants';

export const productListSelect = `
  product_id,
  name,
  tagline,
  upvotes:stats->>upvotes,
  views:stats->>views,
  reviews:stats->>reviews
`;

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
    .select(productListSelect)
    .order('stats->>upvotes', { ascending: false })
    .gte('created_at', startDate.toISO())
    .lte('created_at', endDate.toISO())
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return data;
};

export const getCategories = async () => {
  const { data, error } = await client.from('categories').select(`
    category_id,
    name,
    description
    `);

  if (error) throw error;

  return data;
};

export const getCategoryById = async (categoryId: number) => {
  const { data, error } = await client
    .from('categories')
    .select(
      `
    category_id,
    name,
    description
    `,
    )
    .eq('category_id', categoryId)
    .single();

  if (error) throw error;

  return data;
};

export const getProductsByCategoryId = async ({
  categoryId,
  page,
  limit,
}: {
  categoryId: number;
  page: number;
  limit: number;
}) => {
  const { data, error } = await client
    .from('products')
    .select(productListSelect)
    .eq('category_id', categoryId)
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return data;
};

export const getCategoryPageCount = async (categoryId: number) => {
  const { count, error } = await client
    .from('products')
    .select('product_id', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  if (error) throw error;
  if (!count) return 1;

  return Math.ceil(count / PRODUCTS_PER_PAGE);
};

export const getProductsBySearch = async ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  const { data, error } = await client
    .from('products')
    .select(productListSelect)
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return data;
};

export const getSearchPageCount = async (query: string) => {
  const { count, error } = await client
    .from('products')
    .select('product_id', { count: 'exact', head: true })
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);

  if (error) throw error;
  if (!count) return 1;

  return Math.ceil(count / PRODUCTS_PER_PAGE);
};

export const getProductById = async (productId: string) => {
  const { data, error } = await client
    .from('product_overview_view')
    .select('*')
    .eq('product_id', productId)
    .single();

  if (error) throw error;

  return data;
};

export const getProductReviews = async (productId: string) => {
  const { data, error } = await client
    .from('reviews')
    .select(
      `
      review_id,
      rating,
      review,
      created_at,
      user:profiles!inner(
        name,
        username,
        avatar
      )
      `,
    )
    .eq('product_id', productId);

  if (error) throw error;

  return data;
};
