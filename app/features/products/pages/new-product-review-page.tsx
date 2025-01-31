import type { Route } from './+types/new-product-review-page';

export function loader({ params }: Route.LoaderArgs) {
  return {
    productId: params.productId,
  };
}

export function action({ request, params }: Route.ActionArgs) {
  // 리뷰 제출 로직
  return { success: true };
}

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: '새 리뷰 작성' },
    { name: 'description', content: '제품에 대한 리뷰를 작성하세요' },
  ];
}

export default function NewProductReviewPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div>
      <h1>새 리뷰 작성</h1>
      <form method='post'>{/* 리뷰 작성 폼 */}</form>
    </div>
  );
}
