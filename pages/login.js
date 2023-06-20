import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const session = useSession();
  console.log("hsn", session);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res.error == null) {
        router.push("/");
      } else {
        console.log("error occured login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen w-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-red-300 px-10 py-10 flex flex-col items-center border border-grey-400 rounded-lg  ">
          <h1 className="mb-2">Login</h1>
          <input
            defaultValue="Kullanıcı Adı"
            className="text-center border border-black-500 rounded-md"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
          <input
            defaultValue="Şifre"
            className="text-center border border-black-500 rounded-md mt-3"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <div className="flex flex-row">
            {" "}
            <button
              type="submit"
              className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1 mr-2"
            >
              Giriş
            </button>
            <Link
              href="/register"
              className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1"
            >
              Üye Ol
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
