import { z } from 'zod';
import type { Route } from './+types/social-start-page';
import { redirect } from 'react-router';
import { makeSSRClient } from '~/supa-client';

const paramSchema = z.object({
  provider: z.enum(['github', 'kakao']),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramSchema.safeParse(params);
  if (!success) {
    return redirect('/auth/login');
  }

  const { provider } = data;
  const redirectTo = `http://localhost:5173/auth/social/${provider}/complete`;
  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },
    error,
  } = await client.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });

  if (error) throw error;

  // 쿠키를 포함한 헤더를 전달하여 인증 세션을 유지합니다.
  // 소셜 로그인 후 사용자가 돌아올 때 인증 상태를 유지하기 위함입니다.
  if (url) return redirect(url, { headers });
};
