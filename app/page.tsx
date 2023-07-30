
"use client"
import { signIn } from "next-auth/react";

export default  function page() {
  return(
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
<h1>You are Not Logged In Please login to continue </h1>
<button className="bg-green-700 py-2 px-10 mt-10 rounded-md" onClick={()=>signIn("google")}>Login</button>
    </div>
  )
}