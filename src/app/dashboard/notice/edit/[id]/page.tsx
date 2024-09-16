import Form from '@/components/dashboard/notice/edit-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchById } from '@/data/actions/notice';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const result = await fetchById(id);
    const data = JSON.parse(JSON.stringify(result))
    if (!result) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Notice', href: '/dashboard/notice' },
                    {
                        label: 'Edit',
                        href: `/dashboard/notice/edit/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form Items={data} />
        </main>
    );
}