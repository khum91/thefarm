import Form from '@/components/dashboard/banner/edit-form'
import Breadcrumbs from '@/components/common/breadcrumbs';
import { fetchBannerById } from '@/data/actions/banner';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const result = await fetchBannerById(id);
    const data = JSON.parse(JSON.stringify(result))
    if (!result) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Banner', href: '/dashboard/banner' },
                    {
                        label: 'Edit',
                        href: `/dashboard/banner/edit/${id}`,
                        active: true,
                    },
                ]}
            />
            <Form bannerItems={data} />
        </main>
    );
}