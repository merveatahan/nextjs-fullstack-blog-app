import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  // bu api şuanda sadece get isteklerine cevap verebiliyor.. eğer metod get isteği ise gelen istek içerisinde id'ye bakıyor id varsa
  // isteği gerçekleştiriyor ve 200 status kodu yani başarılı cevap dönüyor.. kullanıcı id gönderdiğimiz zaman kullanıcılar arasından ilgili
  //id' deki kullanıcıyı bularak bilgilerini bize dönüyor..

  if (method === "GET") {
    if (req.query.id) {
      const user = await User.findById(req.query.id);
      res.status(200).json(user);
    }
  }
}
