import { Link } from 'react-router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Badge } from '~/common/components/ui/badge';

interface JobCardProps {
  id: string;
  company: string;
  companyLogoUrl: string;
  companyHeadquarters: string;
  title: string;
  salary: string;
  createdAt: string;
  type: string;
  positionLocation: string;
}

export function JobCard({
  id,
  company,
  companyLogoUrl,
  companyHeadquarters,
  title,
  salary,
  createdAt,
  type,
  positionLocation,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className='bg-transparent hover:bg-card/50 transition-colors'>
        <CardHeader>
          <div className='flex items-center gap-4 mb-4'>
            <img
              src={companyLogoUrl}
              alt={`${company} logo`}
              className='size-10 rounded-full'
            />
            <div className='space-x-2'>
              <span className='text-accent-foreground'>{company}</span>
              <span className='text-sm text-muted-foreground'>{createdAt}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className='space-x-1'>
          <Badge variant={'outline'}>{type}</Badge>
          <Badge variant={'outline'}>{positionLocation}</Badge>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <div className='flex flex-col'>
            <span className='text-sm text-muted-foreground font-medium'>
              ${salary}
            </span>
            <span className='text-sm text-muted-foreground font-medium'>
              {companyHeadquarters}
            </span>
          </div>
          <Button variant={'secondary'} size={'sm'}>
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
