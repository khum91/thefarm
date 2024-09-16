'use client';
import { updateBanner, updateState } from '@/data/actions/banner';
import { useFormState } from 'react-dom';
import { BannerForm } from '@/data/definitions';
import { Button } from '@/components/common/button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SingleImageUpload } from '@/components/common/singleImageUploader';

export default function EditForm({ bannerItems }: { bannerItems: BannerForm }) {
  const initialState: updateState = { message: null, errors: {} };
  const updateWithId = updateBanner.bind(null, bannerItems._id);
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
      redirect('/dashboard/banner');
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

            <div className="mb-4">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="string"
                  placeholder="Enter banner name"
                  defaultValue={bannerItems.name}
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

            <fieldset>
              <legend className="mb-2 block text-sm font-medium">
                Choose Status
              </legend>
              <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      id="status"
                      name="status"
                      type="radio"
                      value="active"
                      defaultChecked={bannerItems.status === 'active'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                      aria-describedby="status-error"
                    />
                    <label
                      htmlFor="atcive"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="status"
                      name="status"
                      type="radio"
                      value="inactive"
                      defaultChecked={bannerItems.status === 'inactive'}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor="inactive"
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      Inactive
                    </label>
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

            <div className="mb-4">
              <label htmlFor="link" className="mb-2 block text-sm font-medium">
                Link
              </label>
              <div className="relative">
                <input
                  id="link"
                  name="link"
                  type="string"
                  placeholder="Enter banner link"
                  defaultValue={bannerItems.link}
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="link-error"
                />
              </div>
              <div id="link" aria-live="polite" aria-atomic="true">
                {state.errors?.link &&
                  state.errors.link.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mb-4">
              <div className='inline-flex items-start gap-5 w-full'>
                <SingleImageUpload
                  imageUrl={`/uploads/banners/${bannerItems.image}`}
                  name='image'
                />
              </div>
            </div>

          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/banner"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </>}
    </>
  );
}
