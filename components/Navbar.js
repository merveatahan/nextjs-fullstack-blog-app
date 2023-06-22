import Link from "next/link";

export default function Navbar() {
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
      <div className="flex me-4">
        <div className="mx-2">
          <Link href="/login">Login</Link>
        </div>{" "}
        |
        <div className="mx-2">
          <Link href="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
