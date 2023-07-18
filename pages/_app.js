import "@/public/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import NewNavbar from "@/components/NewNavbar";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <NewNavbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
