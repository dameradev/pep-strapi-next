// mark as client component
"use client";

import { sign } from "crypto";
// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import GoogleSignInButton from "./GoogleSignInButton";

export default function Home() {
  // extracting data from usesession as session
  const { data: session } = useSession()

  console.log(session)

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
        <>
        <p>Welcome {session.user?.name}. Signed In As</p>
        <p>{session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
        </>
    )
  }

  // rendering components for not logged in users
  return (
    <>
        <p>Not Signed In</p>
       <GoogleSignInButton />
        <button onClick={() => signIn('github')}>Sign in with github</button>
    </>
  )

}