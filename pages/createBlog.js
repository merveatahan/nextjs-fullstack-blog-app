import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function CreateBlog() {
  const session = useSession();
  const authorId = session?.data?.user?._id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.data?.user?.accessToken}`,
      },
      body: JSON.stringify({ ...data, authorId: authorId }),
    });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <label>Title</label>
        <input
          placeHolder="Başlık"
          className="text-center border border-black-500 rounded-md mb-2"
          {...register("title", { required: true })}
        />
        <label>Description</label>
        <textarea
          placeHolder="Açıklama"
          className="text-center border border-black-500 rounded-md"
          {...register("description", { required: true })}
        />
        <label>Image</label>
        <input
          placeHolder="url"
          className="text-center border border-black-500 rounded-md mt-3"
          {...register("imageUrl", { required: true })}
        />
        <button
          type="submit"
          className="text-center border border-black-500 rounded-md mt-3 px-2 py-0"
        >
          Ekle
        </button>
      </form>
    </div>
  );
}
