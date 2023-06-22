import bcrypt from "bcrypt";
import User from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  // bu api sadece POST isteklerine cevap veriyor. bunun sebebi ise database'de sadece yeni bir kayıt oluşturmak için kurgulanmış olması..
  // peki bu api post isteklerine cevap vermek için bizden ne bekliyor??
  if (method === "POST") {
    try {
      //alt satırda da görüldüğü gibi bizden username, email, password gibi verileri bekliyor. biz bu apiye bu verileri ekleyerek
      // gönderdiğimiz zaman database'imizde yeni bir kullanıcı kaydı oluşturuyor.
      //tabi bu kullanıcı kaydını oluştururken kullanıcı güvenliği açısından oluşturulan parolanın hash'lenmesi yani kriptolanması gerekiyor
      // bunun için de bcrypt aracını kullanıyoruz.
      const { username, email, password: pass } = req.body;

      const isExisting = await User.findOne({ email });

      if (isExisting) {
        throw new Error("User already exists");
      }
      // bir parolanın hashlenmesi için aşağıdaki şekilde password değişkeninin gönderilmesi gerekiyor..
      const hashedPassword = await bcrypt.hash(pass, 10);
      // daha sonra hashlenmiş parola kullanıcı bilgilerine ekleniyor ve database'e kaydı yapılıyor..
      const userData = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(userData);
    } catch (error) {
      console.error("Kayıt işlemi sırasında bir hata oluştu:", error);
      res
        .status(500)
        .json({ error: "Kayıt işlemi sırasında bir hata oluştu." });
    }
  } else {
    res.status(405).json({ error: "Yalnızca POST istekleri gönderilebilir." });
  }
}
