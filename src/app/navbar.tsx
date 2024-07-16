'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function NavbarComponent() {
  const pathname = usePathname();
  const { data: session, status }: { data: any, status: string } = useSession();
  return (
    <nav className="bg-gray-800 p-2 mb-6 flex">
      <h1 className="text-white p-2">Navbar</h1>
      <div className="flex items-center justify-between px-5 w-full">
        <div>
          {
            pathname !== '/dashboard' ? (
              <>
                <Link href='/' className={`p-2 ${pathname === '/' ? 'text-black' : 'text-white'}`}>
                  Home
                </Link>
                <Link href='/about' className={`p-2 ${pathname === '/about' ? 'text-black' : 'text-white'}`}>About</Link>
                <Link href='/about/profile' className={`p-2 ${pathname === '/about/profile' ? 'text-black' : 'text-white'}`}>Profile</Link>
              </>
            )
              :
              null
          }
        </div>
        <div>

          {
            status === 'authenticated' ? (
              <div className="flex items-center">
                {
                  pathname === '/dashboard' ? (
                    <p className="text-white mr-3">{session?.user?.fullname}</p>
                  )
                    :
                    null
                }
                <button onClick={() => signOut()} className="bg-white rounded-md px-3 text-sm h-7">Logout</button>
              </div>
            ) :
              (
                <button onClick={() => signIn()} className="bg-white rounded-md px-3 text-sm h-7">Login</button>
              )
          }
        </div>

      </div>
    </nav>
  )
};
