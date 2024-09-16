import Form from '@/components/dashboard/minced/create-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add',
};
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Minced Meat', href: '/dashboard/minced' },
          {
            label: 'Add',
            href: '/dashboard/minced/add',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}