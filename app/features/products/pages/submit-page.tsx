import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-page';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/common/components/ui/select';
import { SelectPair } from '~/common/components/select-pair';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Product | wemake' },
    { name: 'description', content: 'Submit your product' },
  ];
};

export default function SubmitPage() {
  return (
    <div>
      <Hero
        title='Submit Your Product'
        description='Share your product with the world'
      />
      <Form className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'>
        <div className='space-y-5'>
          <InputPair
            label='Name'
            description='This is the name of your product'
            id='name'
            name='name'
            type='text'
            placeholder='Name of your product'
            required
          />
          <InputPair
            label='Tagline'
            description='60 characters or less'
            id='tagline'
            name='tagline'
            type='text'
            placeholder='A concise description of your product'
            required
          />
          <InputPair
            label='URL'
            description='The URL of your product'
            id='url'
            name='url'
            type='text'
            placeholder='https://example.com'
            required
          />
          <InputPair
            textArea
            label='Description'
            description='The description of your product'
            id='description'
            name='description'
            type='text'
            placeholder='A detailed description of your product'
            required
          />
          <SelectPair
            label='Category'
            description='The category of your product'
            name='category'
            required
            placeholder='Select a category'
            options={[
              { value: 'ai', label: 'AI' },
              { value: 'design', label: 'Design' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'development', label: 'Development' },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
