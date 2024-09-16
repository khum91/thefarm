'use client';
import { update, updateState } from '@/data/actions/aliveMarket';
import { useFormState } from 'react-dom';
import { AliveMarket } from '@/data/definitions';
import { Button } from '@/components/common/button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SingleImageUpload } from '@/components/common/singleImageUploader';

export default function EditForm({ Items }: { Items: AliveMarket }) {
  const initialState: updateState = { message: null, errors: {} };
  const updateWithId = update.bind(null, Items._id, Items.image);
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
            <div className="mb-2 grid grid-cols-3 gap-x-6">
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="tag" className=" mb-2 block text-sm font-medium">
                  Tag
                </label>
                <input disabled
                  id="tag"
                  name="tag"
                  type="string"
                  value={Items.tag.tag}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="tag-error"
                />
              </div>
              <div className="mb-4 inline-flex gap-1 items-center">
                <label htmlFor="group" className="mb-2 block text-sm font-medium">
                  Group
                </label>
                <input disabled
                  id="group"
                  name="group"
                  type="string"
                  value={Items.tag.group}
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
                  value={Items.tag.breed}
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
                  value={Items.tag.color}
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
                  value={Items.tag.age}
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
                  value={Items.tag.weight}
                  className=" rounded-md border p-2 bg-white text-black text-sm"
                  aria-describedby="weight-error"
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
                    placeholder="Enter Price (Npr.)"
                    defaultValue={Items.price}
                    className=" rounded-md border border-gray-200 p-2  text-sm outline-2 placeholder:text-gray-500"
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
              <label htmlFor="image" className="mb-2 block text-sm font-medium">
                Image
              </label>
              <div className='inline-flex items-start gap-5 w-full'>
                <SingleImageUpload
                  imageUrl={`/uploads/market/goats/${Items.image}`}
                  name='image'
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/market/alive"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </>}
    </>
  );
}
