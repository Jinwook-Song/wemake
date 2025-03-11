CREATE OR REPLACE VIEW gpt_ideas_view AS
SELECT
    i.gpt_idea_id,
    i.idea,
    i.views,
    CASE WHEN i.claimed_at IS NOT NULL THEN true ELSE false END AS claimed,
    COUNT(l.gpt_idea_id) AS likes,
    i.created_at
FROM gpt_ideas i
LEFT JOIN public.gpt_ideas_likes l USING (gpt_idea_id)
GROUP BY i.gpt_idea_id;
