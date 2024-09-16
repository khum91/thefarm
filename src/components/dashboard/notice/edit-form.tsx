'use client';
import { update, updateState } from '@/data/actions/notice';
import { useFormState } from 'react-dom';
import { noticeForm } from '@/data/definitions';
import { Button } from '@/components/common/button';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function EditForm({ Items }: { Items: noticeForm }) {
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
      redirect('/dashboard/notice');
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

        <div className='mb-4'>
          <div className="inline-flex gap-1 items-center">
            <label htmlFor="name" className="block text-sm font-medium">
              Notice For
            </label>
            <input
              id="name"
              name="iname"
              type="string"
              defaultValue={Items.name}
              placeholder="enter Notice Title"
              className="capitalize peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
          </div>
          <div id="name" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <div className="inline-flex gap-1 items-center">
            <label htmlFor="date" className="block text-sm font-medium">
              Expiary On
            </label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={Items.date.toString().substring(0, 10)}
              placeholder="Enter date"
              className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="date-error" />
          </div>
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date &&
              state.errors.date.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className='mb-4'>
          <div className="inline-flex gap-1 items-center w-full">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              defaultValue={Items.message}
              placeholder="enter Short message"
              className="capitalize w-full peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="message-error"
            />
          </div>
          <div id="message" aria-live="polite" aria-atomic="true">
            {state.errors?.message &&
              state.errors.message.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Announced ?
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
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/notice"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        > Cancel</Link>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
