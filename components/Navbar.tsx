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
    <div className='w-full left-0 justify-center  flex fixed top-0 mx-auto py-5'>
    <div className='w-full max-w-screen-xl  flex justify-between'>
    <h1 className="font-bold text-2xl">
          <Link  href="/">
            <span className="text-cyan-400 ">KIIT-</span>CONNECT
          </Link>
        </h1>

        <div className='flex flex-row gap-5 pr-3 justify-center items-center'>
            <button onClick={()=>dispatch(setOpenCreate(true))}>Create</button>
            <button>HOME</button>
            {session.status=="unauthenticated" && <button onClick={()=>signIn("google")}>Login</button> }
            {session.status=="authenticated" && <button onClick={()=>signOut()}>Logout</button> }
        </div>
    </div>
    </div>
  )
}

export default Navbar
