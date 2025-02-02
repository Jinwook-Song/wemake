import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-team-page';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Create Team | wemake' },
    { name: 'description', content: 'Create a new team' },
  ];
};

export default function SubmitTeamPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero title='Create Team' description='Create a new team' />
      <Form className='max-w-screen-2xl mx-auto flex flex-col items-center gap-10'>
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
          <SelectPair
            name='stage'
            label='What is the stage of your product?'
            description='Select the stage of your product'
            required
            placeholder='Select the stage of your product'
            options={[
              { label: 'Idea', value: 'idea' },
              { label: 'Prototype', value: 'prototype' },
              { label: 'Development', value: 'development' },
              { label: 'MVP', value: 'mvp' },
              { label: 'Launched', value: 'launched' },
            ]}
          />
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
          <InputPair
            id='roles'
            name='roles'
            label='What roles are you looking for?'
            description='(comma separated)'
            placeholder='React Developer, Backend Developer, Product Manager'
            type='text'
            required
          />
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
        </div>
        <Button type='submit' size='lg' className='w-full max-w-sm mx-auto'>
          Create team
        </Button>
      </Form>
    </div>
  );
}
