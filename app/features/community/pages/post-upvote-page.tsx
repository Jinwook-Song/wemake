import type { Route } from './+types/post-upvote-page';

export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const postId = formData.get('postId');

  console.log(postId);

  return { ok: true };
};
