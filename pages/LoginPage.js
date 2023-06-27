import { useSession, signIn, signOut } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const session = useSession();
  const onSubmit = async (data) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res.ok) {
        router.push("/");
        Cookies.set("accessToken", session?.data?.user?.accessToken);
        Cookies.set("refreshToken", session?.data?.user?.refreshToken);
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
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
          <input
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
          <button
            type="submit"
            className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1 mr-2"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
