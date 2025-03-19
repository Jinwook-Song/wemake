CREATE or replace function get_product_stats(product_id text)
returns TABLE(
    views bigint,
    visits bigint,
    month text
)
as $$
begin
    return query
    SELECT
        SUM(CASE WHEN event_type = 'product_view' THEN 1 ELSE 0 END) as views,
        SUM(CASE WHEN event_type = 'product_visit' THEN 1 ELSE 0 END) as visits,
        to_char(created_at, 'yyyy-mm') AS month
    FROM
        events
    WHERE
        (event_type = 'product_view' OR event_type = 'product_visit') AND
        event_data ->> 'product_id' = product_id
    GROUP BY
        month
    ORDER BY
        month;
end;
$$ language plpgsql;