import { data, Outlet } from 'react-router';
import { z } from 'zod';
import type { Route } from './+types/leaderboards-layout';

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams),
  );

  if (!success) {
    throw data(
      { message: 'Invalid search params', error_code: 'INVALID_SEARCH_PARAMS' },
      { status: 400 },
    );
  }
}

export default function LeaderboardLayout() {
  return <Outlet />;
}
