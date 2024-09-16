import Form from '@/components/dashboard/alive/create-form'
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
          { label: 'Alive', href: '/dashboard/alive' },
          {
            label: 'Add',
            href: '/dashboard/alive/add',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}