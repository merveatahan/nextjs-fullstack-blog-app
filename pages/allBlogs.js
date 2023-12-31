import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "@/components/BlogCard";
import { useSession } from "next-auth/react";
import ApiClient from "@/interceptor";

// export async function getServerSideProps(context) {
//   console.log(context);
//   const blogs = await axios.get("api/blogs");
//   console.log(blogs);
//   return {
//     props: {},
//   };
// }

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("api/blogs").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  //interceptor kullanarak bütün isteklerin tek bir yerde çalışmasını ve
  //bütün kontrollerin tek bir komponent üzerinden yapılmasını sağladık.
  //bu sayede her istekte bir api kullanıldığında çok fazla kod yazmamız gerekmektedir.
  //örnek istek kodu aşağıdaki gibidir.. bir url'e istek göndereceğimiz zaman const api = new ApiClient(); diyerek interceptoru çağırıyoruz.
  //devamında api.get(url)  diyerek istek gönderiyoruz. get,post,put,delete seçeneklerini göndermemiz gereken isteğe göre ayarlıyoruz.
  // get işlemlerinde sıkıntı yok url sonuna göndermek istediğimiz parametreyi girmemiz yeterli. ancak post ve put işlemlerinde url'den
  // sonra virgül ekleyerek  bir obje içerisinde datayı göndermemiz gerekiyor.. burada dikkat etmemiz gereken şey ise ilgili apinin bizden
  //ne beklediği.. apinin bizden beklediği veriler için api klasörü altında bulunan blogs, comments, register, userinfo gibi js dosyalarına
  //göz atmamız gerekiyor. ----> kısaca apileri bir gezelim bakalım  bizden hangi verileri bekliyor??

  const session = useSession();
  const getUserId = session.data.user._id;
  const getUser = async () => {
    const api = new ApiClient();
    const user = await api.get("/api/userinfo?id=" + getUserId);
    console.log(user);
  };

  return (
    <div className="flex justify-center">
      <BlogCard data={blogs} />
    </div>
  );
}
