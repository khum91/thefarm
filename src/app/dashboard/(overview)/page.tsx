import { lusitana } from '@/components/common/fonts';
import { Suspense } from 'react';
import { RevenueChartSkeleton, CardsSkeleton } from '@/components/dashboard/skeletons';
import { cName } from '@/data/constants';
import AliveChart from '@/components/dashboard/alive/graph-chart';
import CardWrapper from '@/components/dashboard/cards';

export default async function Page() {
  //This is artificial delay for testing
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main>
      <h1 className={`${lusitana.className} flex flex-col items-center justify-between mb-4 text-xl md:text-2xl`}>
        {`Welcome to ${cName}'s Dashboad`}
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <AliveChart />
        </Suspense>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </main>
  )
}