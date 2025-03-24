import type { SupaClient } from '~/supa-client';

export const claimIdea = async (
  client: SupaClient,
  { ideaId, userId }: { ideaId: string; userId: string },
) => {
  const { error } = await client
    .from('gpt_ideas')
    .update({ claimed_by: userId, claimed_at: new Date().toISOString() })
    .eq('gpt_idea_id', +ideaId);

  if (error) throw error;
};

export const insertIdeas = async (client: SupaClient, ideas: string[]) => {
  const { error } = await client
    .from('gpt_ideas')
    .insert(ideas.map((idea) => ({ idea })));

  if (error) throw error;
};
