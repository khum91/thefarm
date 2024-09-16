import { UpdateButton, DeleteButton } from './buttons';
import { fetchFilteredAliveItem } from '@/data/actions/alive';
import Pagination from '@/components/common/pagination';

export default async function aliveItemTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const response = await fetchFilteredAliveItem(query, currentPage);
  const count = response.f1
  const items = response.f2
  const totalPages = Math.ceil(Number(count) / 4);


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {items?.map((item) => (
              <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <p className='mr-5'>{item.tag}</p>
                    <p className='mr-5'>{item.group}</p>
                    <p className='mr-5'>{item.breed}</p>
                    <p className='mr-5'>{item.color}</p>
                    <p className='mr-5'>{item.age}</p>
                    <p className='mr-5'>{item.weight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
                  Color
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Age (months)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Weight (Kg)
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
                    {item.tag}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.group}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.breed}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.color}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.age}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.weight}
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
