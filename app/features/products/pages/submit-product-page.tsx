import { Hero } from '~/common/components/hero';
import type { Route } from './+types/submit-product-page';
import { Form, redirect } from 'react-router';
import { InputPair } from '~/common/components/input-pair';
import { SelectPair } from '~/common/components/select-pair';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { useState } from 'react';
import { Button } from '~/common/components/ui/button';
import { cn } from '~/lib/utils';
import { PlusIcon } from 'lucide-react';
import { makeSSRClient } from '~/supa-client';
import { getCurrentUserId } from '~/features/users/queries';
import { z } from 'zod';
import { getCategories } from '../queries';
import { createProduct } from '../mutations';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Submit Product | wemake' },
    { name: 'description', content: 'Submit your product' },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  howItWorks: z.string().min(1),
  category: z.coerce.number(),
  icon: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, {
      message: '최대 파일 크기는 1MB입니다',
    })
    .refine((file) => file.type.startsWith('image/'), {
      message: '이미지 파일만 업로드 가능합니다',
    }),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getCurrentUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getCurrentUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) return { fieldErrors: error.flatten().fieldErrors };

  const { icon, ...rest } = data;
  const { data: uploadData, error: uploadError } = await client.storage
    .from('icons')
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });

  if (uploadError) return { formErrors: uploadError.message };
  const {
    data: { publicUrl },
  } = client.storage.from('icons').getPublicUrl(uploadData.path);

  const productId = await createProduct(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    howItWorks: rest.howItWorks,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId,
  });

  return redirect(`/products/${productId}`);
};

export default function SubmitProductPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { categories } = loaderData;
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setIcon(URL.createObjectURL(file));
  };

  return (
    <div>
      <Hero
        title='Submit Your Product'
        description='Share your product with the world'
      />
      <Form
        method='post'
        encType='multipart/form-data'
        className='grid grid-cols-2 gap-10 max-w-screen-lg mx-auto'
      >
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
          {actionData?.fieldErrors?.name && (
            <p className='text-red-500'>{actionData.fieldErrors.name}</p>
          )}
          <InputPair
            label='Tagline'
            description='60 characters or less'
            id='tagline'
            name='tagline'
            type='text'
            placeholder='A concise description of your product'
            required
          />
          {actionData?.fieldErrors?.tagline && (
            <p className='text-red-500'>{actionData.fieldErrors.tagline}</p>
          )}
          <InputPair
            label='URL'
            description='The URL of your product'
            id='url'
            name='url'
            type='text'
            placeholder='https://example.com'
            required
          />
          {actionData?.fieldErrors?.url && (
            <p className='text-red-500'>{actionData.fieldErrors.url}</p>
          )}
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
          {actionData?.fieldErrors?.description && (
            <p className='text-red-500'>{actionData.fieldErrors.description}</p>
          )}
          <InputPair
            textArea
            label='How it works'
            description='The description of how your product works'
            id='howItWorks'
            name='howItWorks'
            type='text'
            placeholder='A detailed description of how your product works'
            required
          />
          {actionData?.fieldErrors?.howItWorks && (
            <p className='text-red-500'>{actionData.fieldErrors.howItWorks}</p>
          )}
          <SelectPair
            label='Category'
            description='The category of your product'
            name='category'
            required
            placeholder='Select a category'
            options={categories.map((category) => ({
              value: category.category_id.toString(),
              label: category.name,
            }))}
          />
          {actionData?.fieldErrors?.category && (
            <p className='text-red-500'>{actionData.fieldErrors.category}</p>
          )}
          <Button type='submit' size={'lg'} className='w-full'>
            Submit
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='icon' className='flex flex-col gap-1'>
            Icon
            <small className='text-muted-foreground'>
              The icon of your product
            </small>
            <div
              className={cn(
                'size-40 rounded-xl shadow-xl overflow-hidden border flex items-center justify-center cursor-pointer',
                !icon && 'border-dashed',
              )}
            >
              {icon ? (
                <img
                  src={icon}
                  alt='icon'
                  className='object-cover w-full h-full'
                />
              ) : (
                <PlusIcon size={20} width={16} />
              )}
            </div>
          </Label>
          <Input
            id='icon'
            name='icon'
            type='file'
            accept='image/*'
            className='hidden'
            required
            onChange={onChange}
          />
          {actionData?.fieldErrors?.icon && (
            <p className='text-red-500'>{actionData.fieldErrors.icon}</p>
          )}
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
