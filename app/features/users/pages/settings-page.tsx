import { Form, useNavigation } from 'react-router';
import type { Route } from './+types/settings-page';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { useState } from 'react';
import { Label } from '~/common/components/ui/label';
import { cn } from '~/lib/utils';
import { Loader, UserIcon } from 'lucide-react';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId, getUserById } from '../queries';
import { USER_ROLES, type UserRole } from '../constant';
import { z } from 'zod';
import { updateUser, updateUserAvatar } from '../mutations';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '~/common/components/ui/alert';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Settings | wemake' },
    { name: 'description', content: 'Manage your account settings' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const profileId = await getCurrentUserId(client);
  const user = await getUserById(client, { profileId });
  return { user };
};

export const formSchema = z.object({
  name: z.string().min(1),
  role: z.enum(USER_ROLES.map((role) => role.value) as [UserRole]),
  headline: z.string().min(1).optional(),
  bio: z.string().min(1).optional(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const profileId = await getCurrentUserId(client);
  const formData = await request.formData();
  const avatar = formData.get('avatar');
  if (avatar && avatar instanceof File) {
    // 2MB
    if (avatar.size > 2 * 1024 * 1024)
      return { fileErrors: { avatar: ['File size is too large'] } };
    else if (!avatar.type.startsWith('image/'))
      return { fileErrors: { avatar: ['Invalid file type'] } };
    else {
      const { data, error } = await client.storage
        .from('avatars')
        .upload(`${profileId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) return { fileErrors: { avatar: [error.message] } };

      const {
        data: { publicUrl },
      } = client.storage.from('avatars').getPublicUrl(data.path);

      await updateUserAvatar(client, publicUrl, profileId);

      return { ok: true };
    }
  } else {
    const { success, data, error } = formSchema.safeParse(
      Object.fromEntries(formData),
    );
    if (!success) return { fieldErrors: error.flatten().fieldErrors };

    await updateUser(client, data, profileId);
    return { ok: true };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { user } = loaderData;

  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const navigation = useNavigation();

  const isUpdatingProfile =
    (navigation.state === 'submitting' &&
      navigation.formData?.get('avatar') === null) ||
    navigation.state === 'loading';

  const isUpdatingAvatar =
    (navigation.state === 'submitting' &&
      navigation.formData?.get('avatar') !== null) ||
    navigation.state === 'loading';

  return (
    <div className='space-y-20'>
      <div className='grid grid-cols-6 gap-40 items-start'>
        <div className='col-span-4 flex flex-col gap-10'>
          {actionData?.ok && (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Profile updated successfully</AlertDescription>
            </Alert>
          )}
          <h2 className='text-2xl font-semibold'>Edit profile</h2>
          <Form method='post' className='flex flex-col gap-5 w-1/2'>
            <InputPair
              id='name'
              name='name'
              label='Name'
              description='Your public name'
              placeholder='John Doe'
              type='text'
              required
              defaultValue={user.name}
            />
            {actionData?.fieldErrors?.name && (
              <p className='text-red-500'>
                {actionData.fieldErrors.name.join(', ')}
              </p>
            )}
            <SelectPair
              name='role'
              label='Role'
              description='What role do you identify the most with'
              placeholder='Select a role'
              options={USER_ROLES.map((role) => ({
                value: role.value,
                label: role.label,
              }))}
              required
              defaultValue={user.role}
            />
            {actionData?.fieldErrors?.role && (
              <p className='text-red-500'>
                {actionData.fieldErrors.role.join(', ')}
              </p>
            )}
            <InputPair
              id='headline'
              name='headline'
              label='Headline'
              description='An introduction to your profile'
              placeholder='I am a software engineer...'
              type='text'
              required
              textArea
              defaultValue={user.headline ?? ''}
            />
            {actionData?.fieldErrors?.headline && (
              <p className='text-red-500'>
                {actionData.fieldErrors.headline.join(', ')}
              </p>
            )}
            <InputPair
              id='bio'
              name='bio'
              label='Bio'
              description='Your public bio. It will be displayed on your profile page'
              placeholder='I am a software engineer...'
              type='text'
              required
              textArea
              defaultValue={user.bio ?? ''}
            />
            {actionData?.fieldErrors?.bio && (
              <p className='text-red-500'>
                {actionData.fieldErrors.bio.join(', ')}
              </p>
            )}
            <Button
              type='submit'
              size={'lg'}
              className='w-full'
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                'Update Profile'
              )}
            </Button>
          </Form>
        </div>
        <Form
          method='post'
          encType='multipart/form-data'
          className='col-span-2 space-y-4 p-6 rounded-lg shadow-md border'
        >
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
            {actionData?.fileErrors?.avatar && (
              <p className='text-red-500'>
                {actionData.fileErrors.avatar.join(', ')}
              </p>
            )}
            <div className='flex flex-col text-sm'>
              <span className='text-muted-foreground'>
                Recommanded size: 128x128px
              </span>
              <span className='text-muted-foreground'>
                Allowed formats: png, jpg, jpeg
              </span>
              <span className='text-muted-foreground'>Max file size: 1MB</span>
            </div>
            <Button className='w-full' disabled={isUpdatingAvatar}>
              {isUpdatingAvatar ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                'Update Avatar'
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
