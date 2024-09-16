import { UpdateButton, DeleteButton } from './buttons';
import { fetchFilteredItem } from '@/data/actions/meatMarket';
import Pagination from '@/components/common/pagination';
import formatToNepaliCurrency from "@/components/lib/currencyformat"
import Status from './status';
import Image from 'next/image';
import { expDate } from '@/components/lib/expiraydate';

export default async function meatItemTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const response = await fetchFilteredItem(query, currentPage);
  const count = response.f1
  const data = response.f2
  const totalPages = Math.ceil(Number(count) / 4);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Part
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Unit
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kill Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Life
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Expiary Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Advedrtised ?
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Image
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((i1) => (
                <tr
                  key={i1.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {i1.item.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {i1.item.part}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {i1.item.unit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {i1.killdate.toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {i1.item.life}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {expDate(i1.killdate, i1.item.life)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatToNepaliCurrency(i1.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={i1.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Image
                      src={`/uploads/meatitems/${i1.item.image}`}
                      className="rounded-lg"
                      width={80}
                      height={80}
                      alt={`${i1.name}'s goat picture`}
                    />
                  </td>
                  <td className="whitespace-nowrap py-3">
                    <div className="flex justify-start gap-3">
                      <UpdateButton id={i1.id} />
                      <DeleteButton id={i1.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
