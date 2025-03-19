import type { DateTime } from 'luxon';
import { PRODUCTS_PER_PAGE } from './constants';
import type { SupaClient } from '~/supa-client';

export const productListSelect = `
  product_id,
  name,
  tagline,
  upvotes:stats->>upvotes,
  views:stats->>views,
  reviews:stats->>reviews
`;

export const getProductsByDateRnage = async (
  client: SupaClient,
  {
    startDate,
    endDate,
    limit,
    page = 1,
  }: {
    startDate: DateTime;
    endDate: DateTime;
    limit: number;
    page?: number;
  },
) => {
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

export const getCategories = async (client: SupaClient) => {
  const { data, error } = await client.from('categories').select(`
    category_id,
    name,
    description
    `);

  if (error) throw error;

  return data;
};

export const getCategoryById = async (
  client: SupaClient,
  { categoryId }: { categoryId: number },
) => {
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

export const getProductsByCategoryId = async (
  client: SupaClient,
  {
    categoryId,
    page,
    limit,
  }: {
    categoryId: number;
    page: number;
    limit: number;
  },
) => {
  const { data, error } = await client
    .from('products')
    .select(productListSelect)
    .eq('category_id', categoryId)
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return data;
};

export const getCategoryPageCount = async (
  client: SupaClient,
  { categoryId }: { categoryId: number },
) => {
  const { count, error } = await client
    .from('products')
    .select('product_id', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  if (error) throw error;
  if (!count) return 1;

  return Math.ceil(count / PRODUCTS_PER_PAGE);
};

export const getProductsBySearch = async (
  client: SupaClient,
  {
    query,
    page,
    limit,
  }: {
    query: string;
    page: number;
    limit: number;
  },
) => {
  const { data, error } = await client
    .from('products')
    .select(productListSelect)
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`)
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw error;

  return data;
};

export const getSearchPageCount = async (
  client: SupaClient,
  { query }: { query: string },
) => {
  const { count, error } = await client
    .from('products')
    .select('product_id', { count: 'exact', head: true })
    .or(`name.ilike.%${query}%, tagline.ilike.%${query}%`);

  if (error) throw error;
  if (!count) return 1;

  return Math.ceil(count / PRODUCTS_PER_PAGE);
};

export const getProductById = async (
  client: SupaClient,
  { productId }: { productId: string },
) => {
  const { data, error } = await client
    .from('product_overview_view')
    .select('*')
    .eq('product_id', productId)
    .single();

  if (error) throw error;

  return data;
};

export const getProductReviews = async (
  client: SupaClient,
  { productId }: { productId: string },
) => {
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
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};
