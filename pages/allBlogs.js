import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { getSession, useSession } from "next-auth/react";
import ApiClient from "@/interceptor";

export async function getServerSideProps(context) {
  let api = new ApiClient();
  let session = await getSession(context);
  api.state.token = session?.user?.accessToken;
  let blogData = [];
  let blogs = await api.get("/api/blogs");

  if (blogs.success) {
    blogData = blogs.data;
  }
  let userInfo = await api.get("/api/userinfo?id=" + session?.user?._id);

  return {
    props: { session, userInfo, blogData },
  };
}

export default function AllBlogs(props) {
  const session = useSession();
  const [blogs, setBlogs] = useState(props.blogData ? props.blogData : []);

  //interceptor kullanarak bütün isteklerin tek bir yerde çalışmasını ve
  //bütün kontrollerin tek bir komponent üzerinden yapılmasını sağladık.
  //bu sayede her istekte bir api kullanıldığında çok fazla kod yazmamız gerekmektedir.
  //örnek istek kodu aşağıdaki gibidir.. bir url'e istek göndereceğimiz zaman const api = new ApiClient(); diyerek interceptoru çağırıyoruz.
  //devamında api.get(url)  diyerek istek gönderiyoruz. get,post,put,delete seçeneklerini göndermemiz gereken isteğe göre ayarlıyoruz.
  // get işlemlerinde sıkıntı yok url sonuna göndermek istediğimiz parametreyi girmemiz yeterli. ancak post ve put işlemlerinde url'den
  // sonra virgül ekleyerek  bir obje içerisinde datayı göndermemiz gerekiyor.. burada dikkat etmemiz gereken şey ise ilgili apinin bizden
  //ne beklediği.. apinin bizden beklediği veriler için api klasörü altında bulunan blogs, comments, register, userinfo gibi js dosyalarına
  //göz atmamız gerekiyor. ----> kısaca apileri bir gezelim bakalım  bizden hangi verileri bekliyor??

  return (
    <div className="flex justify-center">
      <BlogCard data={blogs} />
    </div>
  );
}
