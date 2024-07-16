'use client';
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage({ searchParams }: any) {
  const { push } = useRouter()
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: searchParams.callbackUrl || '/',
      });
      if (!res?.error) {
        setIsLoading(false);
        e.target.reset();
        push(searchParams.callbackUrl || '/');
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          setError("Invalid email or password");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
        {
          error !== '' && <h1 className="text-red-600 font-bold mb-3">{error}</h1>
        }
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input type="email" id="email" name="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input type="password" id="password" name="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
              <Link href="/auth/forgot"
                className="text-xs text-indigo-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                Password?</Link>
            </div>
            <div className="space-y-3 mb-3">
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
              <hr />
              <button type="button" onClick={() => signIn('google', { callbackUrl: searchParams.callbackUrl || '/', redirect: false })} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Login with Google'}
              </button>
            </div>
            <div className="flex items-center mb-4 text-base text-white">
              <p>Not registered?</p>
              <Link href="/register"
                className="text-indigo-500 ml-1 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};
