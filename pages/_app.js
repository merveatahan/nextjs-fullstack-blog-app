import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import "@/public/styles/globals.css";
import store from "@/src/store";
import { Provider } from "react-redux";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Navbar userInfo={session} />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
