import type { SupaClient } from '~/supa-client';

export const getGptIdeas = async (
  client: SupaClient,
  { limit }: { limit: number },
) => {
  const { data, error } = await client
    .from('gpt_ideas_view')
    .select('*')
    .limit(limit);

  if (error) throw error;
  return data;
};

export const getGptIdea = async (
  client: SupaClient,
  { ideaId }: { ideaId: string },
) => {
  const { data, error } = await client
    .from('gpt_ideas_view')
    .select('*')
    .eq('gpt_idea_id', ideaId)
    .single();

  if (error) throw error;
  return data;
};

export const getGptIdeaViews = async (
  client: SupaClient,
  { ideaId }: { ideaId: string },
) => {
  const { count, error } = await client
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'idea_view')
    .eq('event_data->>idea_id', ideaId);

  if (error) throw error;
  return { count };
};
