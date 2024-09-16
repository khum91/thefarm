import Form from '@/components/dashboard/market/alivemarket/edit-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchById } from '@/data/actions/aliveMarket';
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
                    { label: 'Market / Alive', href: '/dashboard/market/alive' },
                    {
                        label: 'Edit',
                        href: `/dashboard/market/alive/edit/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form Items={data} />
        </main>
    );
}