import type { SupaClient } from '~/supa-client';

export const getTeams = async (
  client: SupaClient,
  { limit }: { limit: number },
) => {
  const { data, error } = await client
    .from('teams')
    .select(
      `
    team_id,
    roles,
    product_description,
    team_leader:profiles!inner(
       username,
       avatar
    )
    `,
    )
    .limit(limit);
  if (error) throw error;
  return data;
};

export const getTeamById = async (
  client: SupaClient,
  { teamId }: { teamId: string },
) => {
  const { data, error } = await client
    .from('teams')
    .select(
      `
      *,
      team_leader:profiles!inner(
        name,
        avatar,
        role
      )
    `,
    )
    .eq('team_id', teamId)
    .single();
  if (error) throw error;
  return data;
};
