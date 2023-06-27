import { mongooseConnect } from "@/lib/mongoose";
import { verifyJwtToken } from "@/lib/jwt";
import { Comment } from "@/models/Comment";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;
  const accessToken = req.headers.authorization;
  const token = accessToken?.split(" ")[1];
  const decodedToken = verifyJwtToken(token);
  console.log("***********decode", req.query);
  // bu apide ve diğer apilerimizde bizden beklenen değerlerin
  // ne olduğunu görebilmek adına Models klasörü içinde bulunan şemalara göz atmamız gerekiyor..
  // bu apiye hem get, put, post, delete her türlü isteği gönderebiliyoruz. yani bütün işlemler tek bir apide gerçekleşiyor...
  //burada dikkat etmemiz gereken asıl şey post delete ve put işlemlerinde kullanıcının giriş yapmış olduğu tokeni kontrol ediyoruz.
  // eğer giriş yapmamışsa giriş yapılması için hata fırlatıyoruz. eğer accessToken varsa ve bu doğrulanmış  yani decodedToken'a dönüşmüşse
  //isteğe cevap dönüyor. eğer yoksa hata fırlatıyoruz.
  // aynı durum BLOGS apisi için de geçerlidir.

  if (method === "GET") {
    if (req.query.blogId) {
      res.json(await Comment.find({ blogId: req.query.blogId }));
    } else {
      res.json(await Comment.find());
      res.status(200).json({ message: "Success!" });
    }
  }

  try {
    if (method === "POST") {
      const { blogId, authorId, text } = req.body;

      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        const CommentDoc = await Comment.create({
          blogId,
          authorId,
          text,
        });
        res.json(CommentDoc);
      }
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
  try {
    if (method === "PUT") {
      const { blogId, text, authorId, _id } = req.body;
      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        await Comment.updateOne(
          { _id },
          {
            text,
            blogId,
            authorId,
          }
        );
        res.json(true);
      }
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
  try {
    if (method === "DELETE") {
      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        if (req.query?.id) {
          await Comment.deleteOne({ _id: req.query?.id });
          res.json(true);
        }
      }
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}
