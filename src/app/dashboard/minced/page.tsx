import { CreateButton } from '@/components/dashboard/minced/buttons';
import { lusitana } from '@/components/common/fonts';
import Search from '@/components/common/search';
import { MincedItemTableSkeleton } from '@/components/dashboard/skeletons';
import Table from '@/components/dashboard/minced/table'
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: ' Raw Minced Meat',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Raw Meat Categories (minced).</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search by name..." />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<MincedItemTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}