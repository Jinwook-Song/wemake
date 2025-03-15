import client from '~/supa-client';
import type { Route } from './+types/product-visit-page';
import { redirect } from 'react-router';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { data, error } = await client
    .from('products')
    .select('url')
    .eq('product_id', params.productId)
    .single();
  if (error) throw new Error(error.message);

  if (data) {
    await client.rpc('track_event', {
      event_type: 'product_visit',
      event_data: { product_id: params.productId },
    });
  }

  return redirect(data.url);
};
