import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon, } from '@heroicons/react/24/outline';
import { lusitana } from '../common/fonts';
import { fetchFilteredMincedItem } from '@/data/actions/minced';
import { fetchFilteredAliveItem, fetchAlive, fetchBreed } from '@/data/actions/alive';
const iconMap = {
  minced: BanknotesIcon, group: UserGroupIcon,
  breed: ClockIcon, population: InboxIcon
};

export default async function CardWrapper() {
  const s1 = await fetchFilteredMincedItem('', 1);
  const s2 = await fetchFilteredAliveItem('', 1);
  const g = await fetchAlive();
  const s3 = g.length
  const b = await fetchBreed()
  const s4 = b.length
 
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} flex flex-col items-center mb-4 text-xl md:text-2xl`}>
        What we Have ?
      </h2>
      <div>
        <Card value={`We have ${s1.f1} minced meat items.`} type="minced" />
        <Card value={`We have ${s2.f1} goats in our farm.`} type="group" />
        <Card value={`We have ${s3} group of goats in our farm.`} type="group" />
        <Card value={`We have ${s4} breeds of goats in our farm.`} type="group" />
      </div>
    </div>
  );
}

export function Card({
  value,
  type,
}: {
  value: number | any;
  type: 'minced' | 'group' | 'breed' | 'population';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className=" flex truncate rounded-xl bg-white  text-center text-2xl">
        <h3>{value}</h3>
      </div>
    </div>
  );
}
