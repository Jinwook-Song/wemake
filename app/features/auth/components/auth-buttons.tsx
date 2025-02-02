import { GithubIcon, LockOpenIcon, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Separator } from '~/common/components/ui/separator';

export default function AuthButtons() {
  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='w-full flex items-center gap-2'>
        <Separator className='grow shrink' />
        <span className='text-sm text-muted-foreground font-light text-nowrap'>
          Or continue with
        </span>
        <Separator className='grow shrink' />
      </div>
      <div className='w-full flex flex-col gap-2'>
        <Button variant='outline' className='w-full' asChild>
          <Link to='/auth/social/kakao/start'>
            <MessageCircle className='size-4' />
            Kakao Talk
          </Link>
        </Button>
        <Button variant='outline' className='w-full' asChild>
          <Link to='/auth/social/github/start'>
            <GithubIcon className='size-4' />
            Github
          </Link>
        </Button>
        <Button variant='outline' className='w-full' asChild>
          <Link to='/auth/otp/start'>
            <LockOpenIcon className='size-4' />
            OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}
