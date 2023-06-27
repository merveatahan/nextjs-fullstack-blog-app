import ApiClient from "@/interceptor";
import { setUserData } from "@/src/stores/userInfo";
import { signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export async function getServerSideProps(context) {
  let api = new ApiClient();
  const session = await getSession(context);
  api.state.token = session?.user;
  let userInfo = [];
  if (session != null) {
    const response = await api.get("/api/userinfo?id=" + session?.user?._id);
    if (response.success) {
      userInfo = response.data;
    }
  }

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/LoginPage",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: { session, userInfo },
  };
}

export default function Home(props) {
  const dispatch = useDispatch();
  dispatch(setUserData(props.userInfo));
  const session = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-center h-screen w-screen items-center">
      {session != null && session.status === "authenticated" ? (
        <div>
          {" "}
          <h1>Giriş Yapıldı</h1>
        </div>
      ) : (
        <h1>Home Page</h1>
      )}
    </div>
  );
}
