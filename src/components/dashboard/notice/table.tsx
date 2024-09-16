import { UpdateButton, DeleteButton } from './buttons';
import { fetchFilteredItem } from '@/data/actions/notice';
import Pagination from '@/components/common/pagination';
import Status from '../market/alivemarket/status';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const response = await fetchFilteredItem(query, currentPage);
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
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Disappers By
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Message
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Published ?
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
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.date.toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 overflow-hidden">
                    {item.message}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={item.status} />
                  </td>
                  <td className="whitespace-nowrap py-3">
                    <div className="flex justify-start gap-3">
                      <UpdateButton id={item.id} />
                      <DeleteButton id={item.id} />
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
