CREATE function public.on_user_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if new.raw_app_meta_data is not null then
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
            insert into public.profiles (profile_id, name, username, role)
            values (new.id, 'Anonymous', '@mr.' || substr(md5(random()::text), 1, 8), 'developer');
        end if;
    end if;
    return new;
end;
$$;

create trigger on_user_created
after insert on auth.users
for each row execute function public.on_user_created();