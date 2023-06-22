import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function BlogDetail() {
  const [comment, setComment] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const blogId = router.query.id;
  const session = useSession();
  const authorId = session?.data?.user?._id;
  const accessToken = session?.data?.user?.accessToken;

  // oluşturulan yorumlar get isteği ile çekiliyor.. ilgili bloğa göre gelmesi için blog id gönderilmeli.
  useEffect(() => {
    axios.get(`/api/blogs?id=${blogId}`);
    axios
      .get(`/api/comments?blogId=${blogId}`)
      .then((res) => setComment(res.data));
  }, []);

  // yorum ekleme işlemleri için oluşturduğum api
  const onSubmitComment = async (data) => {
    await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        ...data,
        authorId: authorId,
        blogId: blogId,
      }),
    });
  };
  // Yorum Düzenleme işlemleri için oluşturduğum api
  const onEditComment = async (data) => {
    await fetch("/api/comments", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        ...data,
        authorId: authorId,
        blogId: blogId,
        _id: comment[0]?._id,
      }),
    });
  };
  //Yorum Silme işlemleri için oluşturduğum api
  const onDelete = async (id) => {
    await axios.delete("/api/comments?id=" + id);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitComment)}>
        <input
          defaultValue="Yorum"
          className="text-center border border-black-500 rounded-md"
          {...register("text", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <button
          type="submit"
          className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1 mr-2"
        >
          Giriş
        </button>
      </form>

      <form onSubmit={handleSubmit(onEditComment)}>
        <input
          defaultValue="Yorum"
          className="text-center border border-black-500 rounded-md"
          {...register("text", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <button
          type="submit"
          className="border border-black-500 rounded-md mt-3 px-5 py-1 mb-1 mr-2"
        >
          Giriş
        </button>
      </form>

      <div>
        {comment && comment.length > 0
          ? comment.map((item, index) => {
              return (
                <div className="flex flex-row" key={index}>
                  <div>{item.text}</div>
                  <button
                    className="bg-red-500 rounded-md px-2 py-1"
                    onClick={() => onDelete(item._id)}
                  >
                    Yorumu Sil
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
