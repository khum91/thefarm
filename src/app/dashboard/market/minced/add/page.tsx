import Form from '@/components/dashboard/market/mincedMarket/create-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchItem } from '@/data/actions/meatMarket';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add',
};
export default async function Page() {
  const result = await fetchItem();
  const meatItems = JSON.parse(JSON.stringify(result))
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Market /Minced Meat', href: '/dashboard/market/minced' },
          {
            label: 'Add',
            href: '/dashboard/market/minced/add',
            active: true,
          },
        ]}
      />
      <Form meatItems={meatItems} />
    </main>
  );
}