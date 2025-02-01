import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-post-page';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Post | wemake' },
    { name: 'description', content: 'Create a new community post' },
  ];
};

export default function SubmitPostPage({}: Route.ComponentProps) {
  return (
    <div className='space-y-20'>
      <Hero
        title='Create Discussion'
        description='Ask questions, share ideas, and connect with the wemake community.'
      />
      <Form className='space-y-10 max-w-screen-md mx-auto'>
        <InputPair
          id='title'
          name='title'
          label='Title'
          description='(40 characters or less)'
          required
          placeholder='i.e What is the best productivity tool?'
        />
        <SelectPair
          name='category'
          label='Category'
          description='Choose a category for your discussion'
          required
          placeholder='i.e Productivity'
          options={[
            { label: 'Productivity', value: 'productivity' },
            { label: 'Technology', value: 'technology' },
            { label: 'Life', value: 'life' },
            { label: 'Other', value: 'other' },
          ]}
        />{' '}
        <InputPair
          id='content'
          name='content'
          label='Content'
          description='(1000 characters or less)'
          required
          placeholder='i.e looking for a tool that can help me manage my time. What are the best tools out there?'
          textArea
        />
        <Button className='mx-auto block'>Create Discussion</Button>
      </Form>
    </div>
  );
}
