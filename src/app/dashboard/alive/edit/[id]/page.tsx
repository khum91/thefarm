import Form from '@/components/dashboard/alive/edit-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchAliveById } from '@/data/actions/alive';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const result = await fetchAliveById(id);
    const data = JSON.parse(JSON.stringify(result))
    if (!result) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Alive', href: '/dashboard/alive' },
                    {
                        label: 'Edit',
                        href: `/dashboard/alive/edit/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form aItems={data} />
        </main>
    );
}