import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const userData = useSelector((state) => state.user.userData);
  const handleSignOut = () => {
    signOut();
  };
  const newBlog = () => {
    router.push("/createBlog");
  };
  return (
    <div className="w-full h-24 flex justify-between items-center bg-red-300">
      <div className="ms-4">
        <Link href="/">Logo</Link>
      </div>
      <ul className="flex ms-16 ">
        <li className="me-12">
          <Link href="/">Home</Link>
        </li>
        <li className="mx-12">
          <Link href="/allBlogs">Blogs</Link>
        </li>
        <li className="mx-12">Categories</li>
        <li className="ms-12">About</li>
      </ul>
      {session.status === "unauthenticated" ? (
        <div className="flex me-4">
          <div className="mx-2">
            <Link href="/LoginPage">Login</Link>
          </div>{" "}
          |
          <div className="mx-2">
            <Link href="/RegisterPage">Register</Link>
          </div>
        </div>
      ) : (
        <div className="flex me-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={newBlog}
            style={{ cursor: "pointer" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>

          <p className="mx-2">{userData.fullname}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
