DROP function if exists public.notify_follow() CASCADE;
DROP function if exists public.notify_review() CASCADE;
DROP function if exists public.notify_reply() CASCADE;

-- Follow user
CREATE FUNCTION public.notify_follow()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.notifications (type, source_id, target_id)
    VALUES ('follow', NEW.follower_id, NEW.following_id);
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_follow_trigger
AFTER INSERT ON public.follows
FOR EACH ROW
EXECUTE FUNCTION public.notify_follow();

-- Review product
CREATE FUNCTION public.notify_review()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = '' 
LANGUAGE plpgsql
AS $$
DECLARE
    product_owner uuid;
BEGIN
    SELECT profile_id INTO product_owner FROM public.products WHERE product_id = NEW.product_id;
    INSERT INTO public.notifications (type, source_id, target_id)
    VALUES ('review', NEW.profile_id, product_owner);
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_review_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.notify_review();

-- Reply to post
CREATE FUNCTION public.notify_reply()
RETURNS TRIGGER
SECURITY DEFINER SET search_path = ''
LANGUAGE plpgsql
AS $$
DECLARE
    post_owner uuid;
BEGIN
    SELECT profile_id INTO post_owner FROM public.posts WHERE post_id = NEW.post_id;
    INSERT INTO public.notifications (type, source_id, target_id)
    VALUES ('reply', NEW.profile_id, post_owner);
    RETURN NEW;
END;
$$;

CREATE TRIGGER notify_reply_trigger
AFTER INSERT ON public.post_replies
FOR EACH ROW
EXECUTE FUNCTION public.notify_reply();
