import { UpdateButton, DeleteButton } from './buttons';
import { fetchFilteredAliveMarketItem } from '@/data/actions/aliveMarket';
import Pagination from '@/components/common/pagination';
import formatToNepaliCurrency from "@/components/lib/currencyformat"
import Status from './status';
import Image from 'next/image';

export default async function aliveItemTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const response = await fetchFilteredAliveMarketItem(query, currentPage);
  const count = response.f1
  const items = response.f2
  const totalPages = Math.ceil(Number(count) / 4);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Tag
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Group
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Breed
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
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {item.tag.tag}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.tag.group}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.tag.breed}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatToNepaliCurrency(item.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={item.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Image
                      src={`/uploads/market/goats/${item.image}`}
                      className="rounded-lg"
                      width={80}
                      height={80}
                      alt={`${item.name}'s goat picture`}
                    />
                  </td>
                  <td className="whitespace-nowrap py-3">
                    <div className="flex justify-start gap-3">
                      <UpdateButton id={item.id} />
                      <DeleteButton id={item.id} iname={item.image} />
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
