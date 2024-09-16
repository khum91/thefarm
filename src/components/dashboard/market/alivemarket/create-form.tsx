'use client'
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/common/button"
import { addAliveMarket, State } from '@/data/actions/aliveMarket';
import Swal from 'sweetalert2'
import { redirect } from 'next/navigation';
import { SingleImageUpload } from '@/components/common/singleImageUploader';
import { AliveForm } from '@/data/definitions';
import { useDebouncedCallback } from 'use-debounce';

export default function Form({ alives }: { alives: AliveForm[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, setImage] = useFormState(addAliveMarket, initialState);
  const [loading, setLoading] = useState<boolean>()
  const [isDataValue, setIsDataValue] = useState<any>();

  const handleSearch = useDebouncedCallback((term) => {
    const result = alives.find(item => item._id === term);
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
      redirect('/dashboard/market/alive');
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
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <div className="mb-2 grid grid-cols-3 self-stretch">
              <div className="mb-4">
                <div className="inline-flex gap-1">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Choose Tag
                  </label>
                  <select
                    id="tagId"
                    name="tag"
                    onChange={(e) => { handleSearch(e.target.value); }}
                    className=" rounded-md border p-2 bg-white text-black text-sm"
                    defaultValue="" aria-describedby="tag-error">
                    <option value="" disabled  >
                      Select a tag
                    </option >
                    {alives.map((alive) => (
                      <option key={alive._id} value={alive._id} >
                        {alive.tag}
                      </option>
                    ))}
                  </select>
                </div>
                <div id="name" aria-live="polite" aria-atomic="true">
                  {state.errors?.tag &&
                    state.errors.tag.map((error: string) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="group" className="mb-2 block text-sm font-medium">
                  Group
                </label>
                <input disabled
                  id="group"
                  name="group"
                  type="string"
                  value={isDataValue?.group}
                  placeholder={isDataValue?.group}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="group-error"
                />
              </div>
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="breed" className="mb-2 block text-sm font-medium">
                  Breed
                </label>
                <input disabled
                  id="breed"
                  name="breed"
                  type="string"
                  value={isDataValue?.breed}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="breed-error"
                />
              </div>
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="color" className="mb-2 block text-sm font-medium">
                  Color
                </label>
                <input disabled
                  id="color"
                  name="color"
                  type="string"
                  value={isDataValue?.color}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="color-error"
                />
              </div>
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="age" className="mb-2 block text-sm font-medium">
                  Age (months)
                </label>
                <input disabled
                  id="age"
                  name="age"
                  type="string"
                  value={isDataValue?.age}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="age-error"
                />
              </div>
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="weight" className="mb-2 block text-sm font-medium">
                  Weight (Kg.)
                </label>
                <input disabled
                  id="weight"
                  name="weight"
                  type="string"
                  value={isDataValue?.weight}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="weight-error"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="mb-2 block text-sm font-medium">
                Price
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="price"
                    name="price"
                    type="number"

                    placeholder="Enter price Npr."
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
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
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="mb-2 block text-sm font-medium">
                Image
              </label>
              <div className='inline-flex items-start gap-5 w-full'>
                <SingleImageUpload
                  name='image'
                  msg={state.errors?.image &&
                    state.errors.image.map((error: string) => (
                      error
                    ))}
                />
              </div>
            </div>

          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/banner"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </>}
    </>
  );
}
