import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    try {
      const { fullname, email, password: pass } = req.body;

      const isExisting = await User.findOne({ email });

      if (isExisting) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPass = await bcrypt.hash(pass, 10);

      const userData = await User.create({
        fullname,
        email,
        password: hashedPass,
      });
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
