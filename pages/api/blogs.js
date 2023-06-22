import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { verifyJwtToken } from "@/lib/jwt";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  const accessToken = req.headers.authorization;
  const token = accessToken?.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  //   if (!accessToken || !decodedToken) {
  //     throw new Error("Lütfen giriş yapınız");
  //   }

  if (method === "GET") {
    if (req.query.id) {
      res.json(await Blog.findById(req.query.id));
    } else {
      res.json(await Blog.find());
    }
  }

  try {
    if (method === "POST") {
      const { title, description, imageUrl, authorId } = req.body;

      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        const BlogDoc = await Blog.create({
          title,
          description,
          imageUrl,
          authorId,
        });
        res.json(BlogDoc);
      }
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
  try {
    if (method === "PUT") {
      const { title, description, imageUrl, authorId, _id } = req.body;
      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        await Blog.updateOne(
          { _id },
          {
            title,
            description,
            imageUrl,
            authorId,
          }
        );
        res.json(true);
      }
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
