'use client';
import { updateMinced,updateState } from '@/data/actions/minced';
import { useFormState } from 'react-dom';
import { MincedForm } from '@/data/definitions';
import { Button } from '@/components/common/button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';
import { Bars4Icon, Bars2Icon } from '@heroicons/react/24/outline';
import { SingleImageUpload } from '@/components/common/singleImageUploader'
import Link from 'next/link';

export default function EditForm({ mItems }: { mItems: MincedForm }) {
  const initialState: updateState = { message: null, errors: {} };
  const updateWithId = updateMinced.bind(null, mItems._id, mItems.image);
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
      redirect('/dashboard/minced');
    }
    setLoading(false)
  }, [state])
  return (
    <form action={formAction}>
      {state.info ?? <p className="mt-2 text-sm text-red-500">
        {state.message}
      </p>
      }
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* for name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              name="name"
              type="string"
              defaultValue={mItems.name}
              placeholder="Enter name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
          </div>
          <div id="name" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* for part */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Part
          </label>
          <div className="relative">
            <input
              id="part"
              name="part"
              type="string"
              defaultValue={mItems.part}
              placeholder="Enter part"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="part-error"
            />
          </div>
          <div id="part" aria-live="polite" aria-atomic="true">
            {state.errors?.part &&
              state.errors.part.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* for unit chhoose radio */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Choose the measuring Unit
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="unit"
                  name="unit"
                  type="radio"
                  value="kg"
                  defaultChecked={mItems.unit === 'kg'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="kg"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Kg <Bars4Icon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="unit"
                  name="unit"
                  type="radio"
                  value="gm"
                  defaultChecked={mItems.unit === 'gm'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="gm"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  gm <Bars2Icon className="h-4 w-4" />
                </label>
              </div>
            </div>

            <div id="unit" aria-live="polite" aria-atomic="true">
              {state.errors?.unit &&
                state.errors.unit.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </fieldset>

        {/* for life span */}
        <div className="mb-4">
          <label htmlFor="life" className="mb-2 block text-sm font-medium">
            Enter Life span in days
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="life"
                name="life"
                type="number"
                defaultValue={mItems.life}
                placeholder="Enter num of days"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="life-error"
              />
            </div>
            <div id="life" aria-live="polite" aria-atomic="true">
              {state.errors?.life &&
                state.errors.life.map((error: string) => (
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
              imageUrl={`/uploads/meatitems/${mItems.image}`}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/minced" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        > Cancel</Link>
        <Button type="submit">Update</Button>
      </div>
    </form>

  );
}
