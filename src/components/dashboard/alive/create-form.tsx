'use client'
import { useFormState } from 'react-dom';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/common/button"
import { addAlive, State } from '@/data/actions/alive';
import Swal from 'sweetalert2'
import { redirect } from 'next/navigation';
import { Groups, Breeds, Colors } from '@/data/constants'


export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(addAlive, initialState);
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    setLoading(true)
    if (state.info) {
      Swal.fire({
        timer: 1500,
        text: 'Added',
        icon: "success",
      });
      redirect('/dashboard/alive');
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
              <label htmlFor="tag" className="mb-2 block text-sm font-medium">
                Tag Number
              </label>
              <div className="relative">
                <input
                  id="tag"
                  name="tag"
                  type="string"
                  placeholder="enter tag number"
                  className="capitalize peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="tag-error"
                />
              </div>
              <div id="tag" aria-live="polite" aria-atomic="true">
                {state.errors?.tag &&
                  state.errors.tag.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="group" className="mb-2 block text-sm font-medium">
                Group
              </label>
              <div className="relative">
                <select
                  id="group"
                  name="group"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="group-error"
                >
                  <option value="" disabled>
                    Select a group
                  </option>
                  {[...Object.values(Groups)].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div id="group" aria-live="polite" aria-atomic="true">
                {state.errors?.group &&
                  state.errors.group.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="breed" className="mb-2 block text-sm font-medium">
                Breed
              </label>
              <div className="relative">
                <select
                  id="breed"
                  name="breed"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="breed-error"
                >
                  <option value="" disabled>
                    Select a breed
                  </option>
                  {[...Object.values(Breeds)].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div id="breed" aria-live="polite" aria-atomic="true">
                {state.errors?.breed &&
                  state.errors.breed.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="color" className="mb-2 block text-sm font-medium">
                Color
              </label>
              <div className="relative">
                <select
                  id="color"
                  name="color"
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="color-error"
                >
                  <option value="" disabled>
                    Select a color
                  </option>
                  {[...Object.values(Colors)].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>
              <div id="color" aria-live="polite" aria-atomic="true">
                {state.errors?.color &&
                  state.errors.color.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="age" className="mb-2 block text-sm font-medium">
                Enter age (month).
              </label>
              <div className="relative">
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter num of months"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="age-error"
                />
              </div>
              <div id="age" aria-live="polite" aria-atomic="true">
                {state.errors?.age &&
                  state.errors.age.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="weight" className="mb-2 block text-sm font-medium">
                Enter expected minimum weight (Kg).
              </label>
              <div className="relative">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="Enter weight"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="weight-error"
                />
              </div>
              <div id="weight" aria-live="polite" aria-atomic="true">
                {state.errors?.weight &&
                  state.errors.weight.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/alive"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            > Cancel</Link>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </>}
    </>
  );
}
