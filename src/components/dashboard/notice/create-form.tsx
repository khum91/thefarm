'use client'
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/common/button"
import { add, State } from '@/data/actions/notice';
import Swal from 'sweetalert2'
import { redirect } from 'next/navigation';
import { Groups, Breeds, Colors } from '@/data/constants'


export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(add, initialState);
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    setLoading(true)
    if (state.info) {
      Swal.fire({
        timer: 1500,
        text: 'Added',
        icon: "success",
      });
      redirect('/dashboard/notice');
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

            <div className='mb-4'>
              <div className="inline-flex gap-1 items-center">
                <label htmlFor="name" className="block text-sm font-medium">
                  Notice For
                </label>
                <input
                  id="name"
                  name="iname"
                  type="string"
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
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/notice"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </>}
    </>
  );
}
