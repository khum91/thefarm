import Form from '@/components/dashboard/notice/create-form'
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
          { label: 'Notice', href: '/dashboard/notice' },
          {
            label: 'Add',
            href: '/dashboard/notice/add',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}