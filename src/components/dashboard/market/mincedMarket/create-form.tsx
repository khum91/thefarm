'use client'
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/common/button"
import { addMeat, State } from '@/data/actions/meatMarket';
import Swal from 'sweetalert2'
import { redirect } from 'next/navigation';
import { MincedForm } from '@/data/definitions';
import { useDebouncedCallback } from 'use-debounce';
import Image from 'next/image';

export default function Form({ meatItems }: { meatItems: MincedForm[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, setImage] = useFormState(addMeat, initialState);
  const [loading, setLoading] = useState<boolean>()
  const [isDataValue, setIsDataValue] = useState<any>();

  const handleSearch = useDebouncedCallback((term) => {
    const result = meatItems.find(item => item._id === term);
    setIsDataValue(result);
  });

  useEffect(() => {
    setLoading(true)
    if (state.info) {
      Swal.fire({
        timer: 1500,
        text: 'Added',
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
                  <label htmlFor="name" className="block text-sm font-medium">
                    Choose Name
                  </label>
                  <select
                    id="item"
                    name="item"
                    onChange={(e) => { handleSearch(e.target.value); }}
                    className="rounded-md border bg-white text-black text-sm"
                    defaultValue="" aria-describedby="tag-error">
                    <option value="" disabled  >
                      Select a Name
                    </option >
                    {meatItems.map((item) => (
                      <option key={item._id} value={item._id} >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div id="item" aria-live="polite" aria-atomic="true">
                  {state.errors?.item &&
                    state.errors.item.map((error: string) => (
                      <p className="text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
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
                  value={isDataValue?.part}
                  placeholder={isDataValue?.part}
                  className="capitalize rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="group-error"
                />
              </div>
              <div>
                <div className="flex gap-2 items-center justify-stretch">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Kill Date
                  </label>
                  <input
                    id="date"
                    name="killdate"
                    type="date"
                    placeholder="Enter kill date"
                    className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="date-error" />
                </div>
                <div id="date-error" aria-live="polite" aria-atomic="true">
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
                  value={isDataValue?.life}
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
                    value={isDataValue?.unit}
                    className=" rounded-md border p-2 bg-white text-black text-sm"
                    aria-describedby="unit-error"
                  />
                </div>
              </div>
            </div>
            <div>
              <Image
                src={`/uploads/meatitems/${isDataValue?.image}`}
                className="rounded-sm"
                width={200}
                height={200}
                alt={`${isDataValue?.image}'picture`} />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/market/minced"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </>}
    </>
  );
}
