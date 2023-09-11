import Navigation from "@/components/Navigation";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession();
  if(!session){
    return(
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 rounded-md">Login with Google</button>
        </div>
    </div>
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Navigation />
      <div className="bg-white flex-grow mt-1 mr-2 mb-2 rounded-lg">{children}</div>
    </div>
  )
}