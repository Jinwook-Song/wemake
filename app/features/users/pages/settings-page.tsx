import { Form } from 'react-router';
import type { Route } from './+types/settings-page';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { useState } from 'react';
import { Label } from '~/common/components/ui/label';
import { cn } from '~/lib/utils';
import { UserIcon } from 'lucide-react';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Settings | wemake' },
    { name: 'description', content: 'Manage your account settings' },
  ];
};

export default function SettingsPage({}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <div className='space-y-20'>
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 flex flex-col gap-10'>
          <h2 className='text-2xl font-semibold'>Edit profile</h2>
          <Form className='flex flex-col gap-5 w-1/2'>
            <InputPair
              id='name'
              name='name'
              label='Name'
              description='Your public name'
              placeholder='John Doe'
              type='text'
              required
            />
            <SelectPair
              name='role'
              label='Role'
              description='What role do you identify the most with'
              placeholder='Select a role'
              options={[
                { label: 'Software Engineer', value: 'software-engineer' },
                { label: 'Product Manager', value: 'product-manager' },
                { label: 'UI/UX Designer', value: 'ui-ux-designer' },
              ]}
              required
            />
            <InputPair
              id='bio'
              name='bio'
              label='Bio'
              description='Your public bio. It will be displayed on your profile page'
              placeholder='I am a software engineer...'
              type='text'
              required
              textArea
            />
            <Button type='submit' size={'lg'} className='w-full'>
              Update Profile
            </Button>
          </Form>
        </div>
        <aside className='col-span-2 space-y-4 p-6 rounded-lg shadow-md border'>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='avatar' className='flex flex-col gap-1'>
              Avatar
              <small className='text-muted-foreground'>
                The avatar of your profile
              </small>
              <div
                className={cn(
                  'size-40 rounded-full shadow-xl overflow-hidden border flex items-center justify-center cursor-pointer text-muted-foreground mt-4',
                  !avatar && 'border-dashed',
                )}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt='avatar'
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <UserIcon size={40} fill='currentColor' />
                )}
              </div>
            </Label>
            <Input
              id='avatar'
              name='avatar'
              type='file'
              accept='image/*'
              className='hidden'
              required
              onChange={onChange}
            />
            <div className='flex flex-col text-sm'>
              <span className='text-muted-foreground'>
                Recommanded size: 128x128px
              </span>
              <span className='text-muted-foreground'>
                Allowed formats: png, jpg, jpeg
              </span>
              <span className='text-muted-foreground'>Max file size: 1MB</span>
            </div>
            <Button className='w-full'>Update Avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
