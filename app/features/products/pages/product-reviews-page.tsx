import type { Route } from './+types/product-reviews-page';

export function loader({ params }: Route.LoaderArgs) {
  return {
    reviews: [
      // ... 리뷰 데이터를 가져오는 로직
    ],
  };
}

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `제품 리뷰 - ${params.productId}` },
    { name: 'description', content: '제품에 대한 사용자 리뷰를 확인하세요' },
  ];
}

export default function ProductReviewsPage({
  loaderData,
}: Route.ComponentProps) {
  const { reviews } = loaderData;

  return (
    <div>
      <h1>제품 리뷰</h1>
      {/* 리뷰 목록 렌더링 */}
    </div>
  );
}
