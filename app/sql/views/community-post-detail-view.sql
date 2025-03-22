CREATE OR REPLACE VIEW community_post_detail_view AS
SELECT
    p.post_id,
    p.title,
    p.content,
    p.upvotes,
    p.created_at,
    t.topic_id,
    t.name as topic_name,
    t.slug as topic_slug,
    COUNT(r.post_id) as replies_count,
    pr.name as author_name,
    pr.avatar as author_avatar,
    pr.role as author_role,
    pr.created_at as author_created_at,
    (SELECT COUNT(*) FROM products WHERE products.profile_id = pr.profile_id) AS product_count,
    (
        SELECT EXISTS (
            SELECT 1 
            FROM public.post_upvotes pu 
            WHERE pu.post_id = p.post_id 
            AND pu.profile_id = auth.uid()
        )
    ) AS is_upvoted
FROM posts p
INNER JOIN topics t USING (topic_id)
LEFT JOIN post_replies r USING (post_id)
INNER JOIN profiles pr ON (pr.profile_id = p.profile_id)
GROUP BY 
    p.post_id, 
    t.topic_id, 
    t.name, 
    t.slug, 
    pr.name, 
    pr.avatar, 
    pr.role, 
    pr.created_at, 
    pr.profile_id;
