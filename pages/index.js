import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (session.status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [session.status, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="flex justify-center h-screen w-screen items-center">
      Home Page
      {/*}   <button
        className="border border-red-500 rounded-md px-2 py-1 ml-2"
        onClick={handleSignOut}
      >
        Çıkış
  </button> */}
    </div>
  );
}
