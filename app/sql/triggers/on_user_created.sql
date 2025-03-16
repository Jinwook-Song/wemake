DROP function if exists public.on_user_created() CASCADE;

CREATE function public.on_user_created()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if new.raw_app_meta_data is not null then
        -- email 로그인
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
            if new.raw_user_meta_data ? 'name' and new.raw_user_meta_data ? 'username' then
                insert into public.profiles (profile_id, name, username, role)
                values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username', 'developer');
            else
                insert into public.profiles (profile_id, name, username, role)
                values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8), 'developer');
            end if;
        end if;

        -- 소셜 로그인(kakao)
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
            insert into public.profiles (profile_id, name, username, role, avatar)
            values (
                new.id, 
                new.raw_user_meta_data ->> 'name', 
                -- 고유한 username 생성을 위해 랜덤 문자열 추가
                new.raw_user_meta_data ->> 'preferred_username' || substr(md5(random()::text), 1, 5),
                'developer', 
                new.raw_user_meta_data ->> 'avatar_url'
            );
        end if;

        -- 소셜 로그인(github)
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'github' then
            insert into public.profiles (profile_id, name, username, role, avatar)
            values (
                new.id, 
                new.raw_user_meta_data ->> 'full_name', 
                -- 고유한 username 생성을 위해 랜덤 문자열 추가
                new.raw_user_meta_data ->> 'user_name' || substr(md5(random()::text), 1, 5), 
                'developer', 
                new.raw_user_meta_data ->> 'avatar_url'
            );
        end if;

    end if;
    return new;
end;
$$;

create trigger on_user_created
after insert on auth.users
for each row execute function public.on_user_created();