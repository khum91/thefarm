import Form from '@/components/dashboard/market/alivemarket/create-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchAliveItem } from '@/data/actions/aliveMarket';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add',
};
export default async function Page() {
  const result = await fetchAliveItem();
  const alives = JSON.parse(JSON.stringify(result))
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Market /Alive', href: '/dashboard/market/alive' },
          {
            label: 'Add',
            href: '/dashboard/market/alive/add',
            active: true,
          },
        ]}
      />
      <Form alives={alives} />
    </main>
  );
}