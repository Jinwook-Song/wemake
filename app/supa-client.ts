import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from '@supabase/ssr';
import type { MergeDeep, SetNonNullable, SetFieldType } from 'type-fest';
import type { Database as SupabaseDatabase } from 'database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export type Database = MergeDeep<
  SupabaseDatabase,
  {
    public: {
      Views: {
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase['public']['Views']['community_post_list_view']['Row']
            >,
            'avatar',
            string | null
          >;
        };
        gpt_ideas_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['gpt_ideas_view']['Row']
          >;
        };
        product_overview_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['product_overview_view']['Row']
          >;
        };
        community_post_detail_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['community_post_detail_view']['Row']
          >;
        };
        messages_view: {
          Row: SetNonNullable<
            SupabaseDatabase['public']['Views']['messages_view']['Row']
          >;
        };
      };
    };
  }
>;

export const browserClient = createBrowserClient<Database>(
  'https://vaararotbnjtiyihekkj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYXJhcm90Ym5qdGl5aWhla2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxODI4MTMsImV4cCI6MjA1NDc1ODgxM30.Dj3dDsbjjyhn3eXuhiG9SWtSDj86UtM-dKZfN0Bhb-8',
);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') || '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append(
              'Set-Cookie',
              serializeCookieHeader(name, value, options),
            );
          });
        },
      },
    },
  );

  return {
    client: serverSideClient,
    headers,
  };
};

export type SupaClient = SupabaseClient<Database>;
