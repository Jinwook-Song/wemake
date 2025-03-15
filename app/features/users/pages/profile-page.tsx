import { useOutletContext } from 'react-router';
import type { Route } from './+types/profile-page';

export default function ProfilePage() {
  const { uid, headline, bio } = useOutletContext<{
    uid: string;
    headline: string;
    bio: string;
  }>();
  return (
    <div className='max-w-screen-md flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <h4 className='text-lg font-medium'>Headline</h4>
        <p className='text-sm text-muted-foreground'>{headline}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className='text-lg font-medium'>About</h4>
        <p className='text-sm text-muted-foreground'>{bio}</p>
      </div>
    </div>
  );
}
