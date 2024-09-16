import Form from '@/components/dashboard/banner/create-form'
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
          { label: 'Banner', href: '/dashboard/banner' },
          {
            label: 'Add',
            href: '/dashboard/banner/add',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}