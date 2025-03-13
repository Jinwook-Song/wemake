CREATE OR REPLACE VIEW product_overview_view AS
SELECT
    product_id,
    name,
    tagline,
    description,
    how_it_works,
    icon,
    url,
    stats->>'upvotes' AS upvotes,
    stats->>'views' AS views,
    stats->>'reviews' AS reviews,
    AVG(r.rating) AS average_rating
FROM 
    public.products
LEFT JOIN 
    public.reviews r USING (product_id)
GROUP BY 
    product_id;


