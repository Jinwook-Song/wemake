import { Hero } from '~/common/components/hero';
import type { Route } from './+types/promote-page';
import { Form } from 'react-router';
import { SelectPair } from '~/common/components/select-pair';
import { Calendar } from '~/common/components/ui/calendar';
import { Label } from '~/common/components/ui/label';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { DateTime } from 'luxon';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Promote Product | Product Hunt Clone' },
    { name: 'description', content: 'Promote your product' },
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>(
    undefined,
  );

  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? DateTime.fromJSDate(promotionPeriod.to) //
          .diff(DateTime.fromJSDate(promotionPeriod.from), 'days').days
      : 0;

  return (
    <div>
      <Hero
        title='Promote Your Product'
        description='Boost your product with our promotion service.'
      />
      <Form className='max-w-md mx-auto flex flex-col gap-10 items-center'>
        <SelectPair
          label='Select a product'
          description='Select a product to promote'
          name='product'
          required
          placeholder='Select a product'
          options={[
            { label: 'Product 1', value: 'product-1' },
            { label: 'Product 2', value: 'product-2' },
            { label: 'Product 3', value: 'product-3' },
          ]}
        />
        <div className='flex flex-col gap-2 w-full items-center'>
          <Label className='flex flex-col items-center gap-1'>
            Select a range of dates for promotion
            <small className='text-muted-foreground'>
              Minimum duration is 3 days
            </small>
          </Label>
          <h3>
            {promotionPeriod?.from &&
              promotionPeriod?.to &&
              `${DateTime.fromJSDate(promotionPeriod.from).toLocaleString(
                DateTime.DATE_SHORT,
              )} - ${DateTime.fromJSDate(promotionPeriod.to).toLocaleString(
                DateTime.DATE_SHORT,
              )}`}
          </h3>
          <Calendar
            mode='range'
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            max={365}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays < 3}>
          Go to checkout (${totalDays * 20})
        </Button>
      </Form>
    </div>
  );
}
