CREATE or replace function get_dashboard_stats(user_id uuid)
returns TABLE(
    views bigint,
    month text
)
as $$
begin
    return query
    SELECT
        count(*) as views,
        to_char(created_at, 'yyyy-mm') AS month
    FROM
        events
    WHERE
        event_type = 'profile_view' and
        event_data ->> 'user_id' = user_id::text
    GROUP BY
        month
    ORDER BY
        month;
end;
$$ language plpgsql;