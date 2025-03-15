import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/product-visit-page';
import { redirect } from 'react-router';

export const loader = async ({
  params: { productId },
  request,
}: Route.LoaderArgs & { params: { productId: string } }) => {
  const { client, headers } = makeSSRClient(request);
  const { data, error } = await client
    .from('products')
    .select('url')
    .eq('product_id', productId)
    .single();
  if (error) throw new Error(error.message);

  if (data) {
    await client.rpc('track_event', {
      event_type: 'product_visit',
      event_data: { product_id: productId },
    });
  }

  return redirect(data.url);
};
