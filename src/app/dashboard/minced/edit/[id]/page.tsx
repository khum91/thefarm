import Form from '@/components/dashboard/minced/edit-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchMincedById } from '@/data/actions/minced';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const result = await fetchMincedById(id);
    const data = JSON.parse(JSON.stringify(result))
    if (!result) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Minced Meat', href: '/dashboard/minced' },
                    {
                        label: 'Edit',
                        href: `/dashboard/minced/edit/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form mItems={data} />
        </main>
    );
}