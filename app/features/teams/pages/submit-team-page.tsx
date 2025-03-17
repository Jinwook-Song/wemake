import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-team-page';
import { Form, redirect, useNavigation } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';
import { PRODUCT_STAGES, type ProductStage } from '../constant';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '~/features/users/queries';
import { z } from 'zod';
import { createTeam } from '../mutations';
import { Loader } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Create Team | wemake' },
    { name: 'description', content: 'Create a new team' },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getCurrentUserId(client);
};

export const formSchema = z.object({
  name: z.string().min(1).max(20),
  stage: z.enum(PRODUCT_STAGES.map((stage) => stage.value) as [ProductStage]),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string().min(1).max(200),
  description: z.string().min(1).max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) return { fieldErrors: error.flatten().fieldErrors };
  const { team_id } = await createTeam(client, data, userId);
  return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === 'submitting' || navigation.state === 'loading';

  return (
    <div className='space-y-20'>
      <Hero title='Create Team' description='Create a new team' />
      <Form
        method='post'
        className='max-w-screen-2xl mx-auto flex flex-col items-center gap-10'
      >
        <div className='w-full grid grid-cols-3 gap-10'>
          <InputPair
            id='name'
            name='name'
            label='What is the name of your product?'
            description='(20 characters max)'
            placeholder='i.e wemake'
            maxLength={20}
            type='text'
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.name?.join(', ')}
            </p>
          )}

          <SelectPair
            name='stage'
            label='What is the stage of your product?'
            description='Select the stage of your product'
            required
            placeholder='Select the stage of your product'
            options={PRODUCT_STAGES.map((stage) => ({
              value: stage.value,
              label: stage.label,
            }))}
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.stage?.join(', ')}
            </p>
          )}
          <InputPair
            id='size'
            name='size'
            label='What is the size of your team?'
            description='(1-100)'
            min={1}
            max={100}
            type='number'
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.size?.join(', ')}
            </p>
          )}
          <InputPair
            id='equity'
            name='equity'
            label='How much equity do you offer?'
            description='(each)'
            min={1}
            max={100}
            type='number'
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.equity?.join(', ')}
            </p>
          )}
          <InputPair
            id='roles'
            name='roles'
            label='What roles are you looking for?'
            description='(comma separated)'
            placeholder='React Developer, Backend Developer, Product Manager'
            type='text'
            required
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.roles?.join(', ')}
            </p>
          )}
          <InputPair
            id='description'
            name='description'
            label='What is the description of your team?'
            description='(200 characters max)'
            placeholder='i.e We are building a new social media platform'
            maxLength={200}
            type='text'
            required
            textArea
          />
          {actionData && 'fieldErrors' in actionData && (
            <p className='text-sm text-red-500'>
              {actionData.fieldErrors?.description?.join(', ')}
            </p>
          )}
        </div>
        <Button
          type='submit'
          size='lg'
          className='w-full max-w-sm mx-auto'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader className='w-4 h-4 animate-spin' />
          ) : (
            'Create team'
          )}
        </Button>
      </Form>
    </div>
  );
}
