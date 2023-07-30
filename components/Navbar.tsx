"use client"

import { useAppDispatch } from '@/Redux/hooks'
import { setOpenCreate } from '@/Redux/reducers/sectionswap'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

    const dispatch = useAppDispatch();
    const session = useSession();
  return (
    <div className='w-full left-0 justify-center  flex fixed top-0 mx-auto'>
    <div className='w-full max-w-screen-xl md:bg-slate-800 bg-slate-700 py-3  flex justify-between'>
    <h1 className="font-bold text-xl px-2">
          <Link  href="/">
            <span className="text-cyan-400 text-xl">KIIT-</span>CONNECT
          </Link>
        </h1>

        <div className='flex flex-row gap-5 pr-3 justify-center items-center'>

            <a href='https://kiitconnect.live'>Home</a>
            {session.status=="unauthenticated" && <button onClick={()=>signIn("google")}>Login</button> }
            {session.status=="authenticated" && <button onClick={()=>signOut()}>Logout</button> }
        </div>
    </div>
    </div>
  )
}

export default Navbar
