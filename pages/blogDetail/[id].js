import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getSession, useSession } from "next-auth/react";
import ApiClient from "@/interceptor";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "@/src/stores/userInfo";
import { setCommentData } from "@/src/stores/comments";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const api = new ApiClient();
  const session = await getSession(context);
  api.state.token = session?.user;

  let userInfo = [];
  if (session != null) {
    const response = await api.get("/api/userinfo?id=" + session?.user?._id);
    if (response.success) {
      userInfo = response.data;
    }
  }

  const comments = await api.get(`/api/comments?blogId=${id}`);
  let commentData = [];
  let yorum = [];
  if (comments.success) {
    commentData = comments.data;
    const filteredComments = commentData.filter((item) => item.blogId === id);
    yorum = filteredComments.length > 0 ? filteredComments : [];
  }

  return {
    props: { comments, userInfo, yorum },
  };
}

export default function BlogDetail(props) {
  // const dispatch = useDispatch();
  // dispatch(setUserData(props.userInfo));
  // dispatch(setCommentData(props.comments.data));
  // const comment = useSelector((state) => state.commentStore.commentData);
  const [comment, setComment] = useState(
    props.comments ? props.comments.data : []
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const session = useSession();
  const blogId = router.query.id;
  const authorId = session?.data?.user?._id;
  const accessToken = session?.data?.user?.accessToken;
  let api = new ApiClient();
  api.state.token = accessToken;

  // yorum ekleme işlemleri için oluşturduğum api
  const onSubmitComment = async (data) => {
    try {
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
      await axios.get("/api/comments?blogId=" + blogId).then((res) => {
        setComment(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  // Yorum Düzenleme işlemleri için oluşturduğum api
  const onEditComment = async (data) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  const getComment = async () => {
    await axios.get("/api/comments?blogId=" + blogId);
  };
  //Yorum Silme işlemleri için oluşturduğum api
  const onDelete = async (id) => {
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      await axios.delete("/api/comments?id=" + id, config);

      await axios.get("/api/comments?blogId=" + blogId).then((res) => {
        setComment(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitComment)}>
        <input
          placeholder="Yorum yaz"
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

      <button onClick={getComment}>Getir</button>
      {/*}
      <form onSubmit={handleSubmit(onEditComment)}>
        <input
          placeholder="Yorum Düzenle"
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
*/}
      <div>
        {comment && comment.length > 0
          ? comment.map((item, index) => {
              return (
                <div className="flex flex-row" key={index}>
                  <div>{item.text}</div>

                  {item.authorId == props.userInfo?._id && (
                    <button
                      className="bg-red-500 rounded-md px-2 py-1"
                      onClick={() => onDelete(item._id)}
                    >
                      Yorumu Sil
                    </button>
                  )}
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
