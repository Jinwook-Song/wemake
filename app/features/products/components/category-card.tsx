import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '~/common/components/ui/card';
import { Link } from 'react-router';
import { ChevronRightIcon } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
}

export function CategoryCard({ id, name, description }: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`} className='block'>
      <Card>
        <CardHeader>
          <CardTitle className='flex'>
            {name} <ChevronRightIcon className='size-6' />
          </CardTitle>
          <CardDescription className='text-base'>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
