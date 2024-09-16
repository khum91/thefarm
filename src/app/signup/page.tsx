"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormState } from 'react-dom';
import { Button } from '../../components/common/button';
import { redirect } from 'next/navigation';
import Swal from 'sweetalert2'
import { addUser, State } from '@/data/actions/auth';

export default function SignupPage() {
    const initialState: State = { message: null, errors: {} };
    const [state, onSignup] = useFormState(addUser, initialState);
    const [loading, setLoading] = useState<boolean>()

    useEffect(() => {
        setLoading(true)
        if (state.info) {
            Swal.fire({
                timer: 1500,
                text: 'Added',
                icon: "success",
            });
            redirect('/login');
        }
        setLoading(false)
    }, [state])

    return (
        <>
            <form action={onSignup} className="flex flex-col items-center justify-center min-h-screen py-2">
                {state.info ?? <p className="mt-2 text-sm text-red-500">
                    {state.message}
                </p>
                }
                <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                    <h1 className={`mb-3 text-2xl`}>Please fill out the form to register.</h1>
                    <hr />
                    <div className="w-full">
                        <div>
                            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="username">
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="username"
                                    name="name"
                                    placeholder="Enter your username"
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
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div id="email" aria-live="polite" aria-atomic="true">
                                {state.errors?.email &&
                                    state.errors.email.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div id="password" aria-live="polite" aria-atomic="true">
                                {state.errors?.password &&
                                    state.errors.password.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>
                                            {error}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="mt-4 w-full">
                        Sign Up
                    </Button>
                    <Link href="/login">Visit login page</Link>
                </div>
            </form>
        </>
    )

}