import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getToken } from 'next-auth/jwt'
import { headers } from 'next/dist/client/components/headers'
import { signOut } from 'next-auth/react'


 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest,res:NextResponse) {

const token = await getToken({
    req:request,
    secret:process.env.NEXT_AUTH_SECRET
})

console.log(token)





if(!token && request.nextUrl.pathname!=="/"){
    return NextResponse.redirect(new URL('/', request.url));
}
if(!token?.email?.includes("@kiit.ac.in") && request.nextUrl.pathname.startsWith("/dashboard")){
    return NextResponse.redirect(new URL('/nonKitians', request.url))
}

if(token && request.nextUrl.pathname=="/"){
    if(token && !token?.email?.includes("@kiit.ac.in")){
        return NextResponse.redirect(new URL('/nonKitians', request.url))
    }else if(token && token?.email?.includes("@kiit.ac.in")){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}






// return;
// if(!token) return NextResponse.redirect(new URL('/auth/login', request.url))
// console.log(session)

// if(session==null) 
// return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard',
    "/",
    '/nonKitians'
  ],
}