"use client"
import { signIn,signOut,useSession } from "next-auth/react"
const Home = () => {
  const {data:session}=useSession();
  return (
    session?<div> 
      <h1>Your are signed in {session.user.email}</h1>
      <button onClick={()=>signOut()}>Sign Out</button>
    </div>:<div>
      <h1>You are not signed in </h1>
      <button onClick={()=>signIn()}>Sing In</button>
    </div>
  )
}

export default Home;