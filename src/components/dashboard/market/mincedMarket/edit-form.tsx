'use client';
import { update, updateState } from '@/data/actions/meatMarket';
import { useFormState } from 'react-dom';
import { meatMarket } from '@/data/definitions';
import { Button } from '@/components/common/button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function EditForm({ Items }: { Items: meatMarket }) {
  const initialState: updateState = { message: null, errors: {} };
  const updateWithId = update.bind(null, Items._id);
  const [state, formAction] = useFormState(updateWithId, initialState);
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    setLoading(true)
    if (state.info) {
      Swal.fire({
        timer: 1000,
        text: 'Updated',
        icon: "success",
      });
      redirect('/dashboard/market/minced');
    }
    setLoading(false)
  }, [state])
  return (
    <>
      {loading ? <><h1>Please Wait ....... </h1>
      </> : <>
        <form action={formAction}>
          {state.info ?? <p className="mt-2 text-sm text-red-500">
            {state.message}
          </p>
          }
          <div className="rounded-md inline-flex bg-slate-200 p-2 gap-4">
            <div className="mb-2 grid grid-cols-2 gap-2 w-3/4">
              <div>
                <div className="inline-flex gap-1 items-center">
                  <label htmlFor="item" className="block text-sm font-medium">
                    Name
                  </label>
                  <input disabled
                    id="item"
                    name="item"
                    type="string"
                    defaultValue={Items.item.name}
                    className=" rounded-md border p-2 bg-white text-black text-sm"
                    aria-describedby="name-error"
                  />
                </div>
              </div>
              <div className="inline-flex gap-1 items-center">
                <label htmlFor="part" className="block text-sm font-medium">
                  Part
                </label>
                <input disabled
                  id="part"
                  name="part"
                  type="string"
                  defaultValue={Items.item.part}
                  className="capitalize rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="group-error"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center justify-stretch">
                  <label htmlFor="killdate" className="block text-sm font-medium">
                    Kill Date
                  </label>
                  <input
                    id="killdate"
                    name="killdate"
                    type="date"
                    defaultValue={Items.killdate.toString().substring(0, 10)}
                    placeholder="Enter kill date"
                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="date-error" />
                </div>
                <div id="killdate-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.killdate &&
                    state.errors.killdate.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>

              <div className="inline-flex gap-1 items-center">
                <label htmlFor="life" className="block text-sm font-medium">
                  Life (Days)
                </label>
                <input disabled
                  id="life"
                  name="life"
                  type="string"
                  defaultValue={Items.item.life}
                  className="rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="life-error"
                />
              </div>
              <div>
                <div className="flex gap-4 items-center justify-stretch">
                  <label htmlFor="price" className="block text-sm font-medium">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter price Npr."
                    defaultValue={Items.price}
                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="price-error"
                  />

                </div>
                <div id="amount-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-3 self-stretch">
                <div className="inline-flex gap-1 items-center">
                  <label htmlFor="unit" className="block text-sm font-medium">
                    Unit
                  </label>
                  <input disabled
                    id="unit"
                    name="unit"
                    type="string"
                    value={Items.item.unit}
                    className=" rounded-md border p-2 bg-white text-black text-sm"
                    aria-describedby="unit-error"
                  />
                </div>
              </div>
              <div className="mb-4">
                <fieldset>
                  <legend className="mb-2 block text-sm font-medium">
                    Advertise ?
                  </legend>
                  <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          id="status"
                          name="status"
                          type="radio"
                          value="active"
                          defaultChecked={Items.status === 'active'}
                          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                          aria-describedby="status-error"
                        />
                        <label
                          htmlFor="atcive"
                          className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                        > Yes  </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="status"
                          name="status"
                          type="radio"
                          value="inactive"
                          defaultChecked={Items.status === 'inactive'}
                          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        />
                        <label
                          htmlFor="inactive"
                          className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        > No  </label>
                      </div>
                    </div>

                    <div id="status" aria-live="polite" aria-atomic="true">
                      {state.errors?.status &&
                        state.errors.status.map((error: string) => (
                          <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                          </p>
                        ))}
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div>
              <Image
                src={`/uploads/meatitems/${Items.item.image}`}
                className="rounded-sm"
                width={200}
                height={200}
                alt={`${Items.item.image}'picture`} />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/market/minced"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </>}
    </>
  );
}
