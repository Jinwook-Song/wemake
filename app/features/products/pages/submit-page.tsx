import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-page';
import { Form } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { useState } from 'react';
import { Button } from '~/common/components/ui/button';
import { cn } from '~/lib/utils';
import { PlusIcon } from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Product | wemake' },
    { name: 'description', content: 'Submit your product' },
  ];
};

export default function SubmitPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

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
          <Button type='submit' size={'lg'} className='w-full'>
            Submit
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='logo' className='flex flex-col gap-1'>
            Logo
            <small className='text-muted-foreground'>
              The logo of your product
            </small>
            <div
              className={cn(
                'size-40 rounded-xl shadow-xl overflow-hidden border flex items-center justify-center cursor-pointer',
                !logo && 'border-dashed',
              )}
            >
              {logo ? (
                <img
                  src={logo}
                  alt='logo'
                  className='object-cover w-full h-full'
                />
              ) : (
                <PlusIcon size={20} width={16} />
              )}
            </div>
          </Label>
          <Input
            id='logo'
            name='logo'
            type='file'
            accept='image/*'
            className='hidden'
            required
            onChange={onChange}
          />
          <div className='flex flex-col'>
            <span className='text-muted-foreground'>
              Recommanded size: 128x128px
            </span>
            <span className='text-muted-foreground'>
              Allowed formats: png, jpg, jpeg
            </span>
            <span className='text-muted-foreground'>Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
