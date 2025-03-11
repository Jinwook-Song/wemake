import client from '~/supa-client';

export const getTeams = async ({ limit }: { limit: number }) => {
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
