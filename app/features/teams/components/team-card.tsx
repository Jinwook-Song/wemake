import { Link } from 'react-router';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { Badge } from '~/common/components/ui/badge';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/common/components/ui/avatar';

interface TeamCardProps {
  id: number;
  leaderUsername: string;
  leaderAvatarUrl: string | null;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  leaderUsername,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`} className='block'>
      <Card className='bg-transparent hover:bg-card/50 transition-colors h-full flex flex-col justify-between'>
        <CardHeader className='flex flex-row items-center'>
          <CardTitle className='text-base leading-loose'>
            <Badge
              variant={'secondary'}
              className='inline-flex shadow-sm items-center text-base'
            >
              <span>@{leaderUsername}</span>
              <Avatar className='ml-1 size-5'>
                <AvatarFallback>
                  {leaderUsername[0].toUpperCase()}
                </AvatarFallback>
                {leaderAvatarUrl && <AvatarImage src={leaderAvatarUrl} />}
              </Avatar>
            </Badge>
            <span> is looking for</span>
            {positions.map((position, index) => (
              <Badge key={index} className='text-base'>
                {position}
              </Badge>
            ))}
            <span> to build </span>
            <span>{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className='justify-end'>
          <Button variant={'link'}>Join Team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
