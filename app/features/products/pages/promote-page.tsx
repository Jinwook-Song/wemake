import { Hero } from '~/common/components/hero';
import type { Route } from './+types/promote-page';
import { SelectPair } from '~/common/components/select-pair';
import { Calendar } from '~/common/components/ui/calendar';
import { Label } from '~/common/components/ui/label';
import { useState, useEffect, useRef } from 'react';
import type { DateRange } from 'react-day-picker';
import { DateTime } from 'luxon';
import { Button } from '~/common/components/ui/button';
import {
  loadTossPayments,
  type TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useAuth } from '~/hooks/use-auth';
import { PROMOTE_PRODUCT_PRICE } from '../constants';

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
  const { userId } = useAuth();

  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? DateTime.fromJSDate(promotionPeriod.to) //
          .diff(DateTime.fromJSDate(promotionPeriod.from), 'days').days
      : 0;

  const widgets = useRef<TossPaymentsWidgets | null>(null);
  const initedToss = useRef(false);

  useEffect(() => {
    if (!userId || initedToss.current) return;
    const initToss = async () => {
      initedToss.current = true;
      const toss = await loadTossPayments(
        'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm',
      );
      widgets.current = toss.widgets({ customerKey: userId });

      await widgets.current.setAmount({
        value: 0,
        currency: 'KRW',
      });

      await widgets.current.renderPaymentMethods({
        selector: '#toss-payment-methods',
      });
      await widgets.current.renderAgreement({
        selector: '#toss-payment-agreement',
      });
    };

    initToss();
  }, [userId]);

  useEffect(() => {
    const updateAmount = async () => {
      if (!widgets.current) return;
      widgets.current.setAmount({
        value: totalDays * PROMOTE_PRODUCT_PRICE,
        currency: 'KRW',
      });
    };
    updateAmount();
  }, [promotionPeriod]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = formData.get('product');
    console.log(product, promotionPeriod);
    if (!product || !promotionPeriod?.from || !promotionPeriod?.to) return;

    await widgets.current?.requestPayment({
      orderId: crypto.randomUUID(),
      orderName: `WeMake Promotion`,
      customerEmail: 'wlsdnr129@naver.com',
      customerName: 'Jw song',
      customerMobilePhone: '01012345678',
      metadata: {
        product,
        promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
        promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
      },
      successUrl: `${window.location.href}/success`,
      failUrl: `${window.location.href}/fail`,
    });
  };

  return (
    <div>
      <Hero
        title='Promote Your Product'
        description='Boost your product with our promotion service.'
      />
      <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-10'>
        <div className='col-span-3 w-1/2 max-w-md mx-auto flex flex-col gap-10 items-center'>
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
        </div>
        <div className='col-span-3 px-20 flex flex-col items-center gap-4'>
          <div
            id='toss-payment-methods'
            className='w-full rounded-md overflow-hidden'
          />
          <div
            id='toss-payment-agreement'
            className='w-full rounded-md overflow-hidden'
          />
          <Button disabled={totalDays === 0} className='w-full'>
            Go to checkout (
            {(totalDays * PROMOTE_PRODUCT_PRICE).toLocaleString('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            })}
            )
          </Button>
        </div>
      </form>
    </div>
  );
}
