"use client"
import { signIn } from "next-auth/react";

export default function Page() {
  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="w-full h-full text-white min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl md:text-2xl  font-bold text-center mb-6">
          You are Not Logged In. Please login to continue.
        </h1>
        <button
          className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-6 rounded-md text-white w-full"
          onClick={handleSignIn}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
