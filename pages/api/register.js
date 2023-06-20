import db from "@/lib/db";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    try {
      const { username, email, password: pass } = req.body;

      const isExisting = await User.findOne({ email });

      if (isExisting) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(pass, 10);

      const userData = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log(userData);
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
