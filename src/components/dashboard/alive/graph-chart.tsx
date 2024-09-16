import { generateYAxis } from '@/components/common/utils'
import { lusitana } from '@/components/common/fonts';
import { fetchAlive } from '@/data/actions/alive';

export default async function AliveChart() {
  const population = await fetchAlive();
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(population);
  if (!population || population.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} flex flex-col items-center mb-4 text-xl md:text-2xl`}>
        Recent Population
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          {[...Object.values(population)].map((i) => (
            <div key={i._id} className="flex flex-col items-center gap-1">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / 4.5) * i.pop}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {i._id}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-sm text-gray-500 ">Groups</h3>
        </div>
      </div>
    </div>
  );
}
