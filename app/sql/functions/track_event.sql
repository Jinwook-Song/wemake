create or replace function track_event(
    event_type event_type,
    event_data jsonb
) returns void as $$
begin
    insert into events (event_type, event_data)
    values (event_type, event_data);
end;
$$ language plpgsql;