import type { SupaClient } from '~/supa-client';
import type { z } from 'zod';
import type { formSchema } from './pages/submit-team-page';

export const createTeam = async (
  client: SupaClient,
  data: z.infer<typeof formSchema>,
  userId: string,
) => {
  data.stage;
  const { data: teamData, error } = await client
    .from('teams')
    .insert({
      product_name: data.name,
      team_size: data.size,
      equity_split: data.equity,
      product_stage: data.stage,
      roles: data.roles,
      product_description: data.description,
      team_leader_id: userId,
    })
    .select('team_id')
    .single();

  if (error) throw new Error(error.message);
  return teamData;
};
